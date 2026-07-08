import { NextResponse } from "next/server";
// @ts-ignore
import ee from "@google/earthengine";

const initializeGEE = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const clientEmail = process.env.GEE_CLIENT_EMAIL;
    const privateKey = process.env.GEE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!clientEmail || !privateKey) {
      return reject(new Error("Identifiants manquants"));
    }

    ee.data.authenticateViaPrivateKey(
      { clientLabel: "LittoWatch-App", privateKey, clientEmail },
      () => {
        ee.initialize(null, null, () => resolve(), (err: any) => reject(err));
      },
      (err: any) => reject(err)
    );
  });
};

export async function POST(request: Request) {
  try {
    const { satellite, indexType, dateRange, bbox } = await request.json();

    await initializeGEE();

    // 1. Découpage dynamique de la zone d'intérêt à partir de la BBox de la carte
    // bbox contient la chaîne "ouest,sud,est,nord" -> On la convertit en tableau de nombres
    const coordsArray = bbox.split(",").map(Number);
    const customRegion = ee.Geometry.Rectangle(coordsArray);

    let collectionId = satellite === "sentinel2" ? "COPERNICUS/S2_SR_HARMONIZED" : "LANDSAT/LC08/C02/T1_TOA";

    // 2. Filtrage spatial pour ne prendre que les images qui touchent la zone de l'utilisateur
    let imageCollection = ee.ImageCollection(collectionId)
      .filterBounds(customRegion)
      .filterDate(`${dateRange}-01-01`, `${dateRange}-12-31`)
      .sort("CLOUD_COVER");

    const selectedImage = imageCollection.first();

    // 3. Calcul de l'indice
    let computedRaster;
    if (indexType === "ndvi") {
      const nirBand = satellite === "landsat8" ? "B5" : "B8";
      computedRaster = selectedImage.normalizedDifference([nirBand, "B4"]);
    } else if (indexType === "ndwi") {
      const nirBand = satellite === "landsat8" ? "B5" : "B8";
      computedRaster = selectedImage.normalizedDifference(["B3", nirBand]);
    } else {
      const swirBand = satellite === "landsat8" ? "B6" : "B11";
      computedRaster = selectedImage.normalizedDifference(["B3", swirBand]);
    }

    // 4. Découpage final et génération de l'URL GeoTIFF
    const downloadUrl = await new Promise<string>((resolve, reject) => {
      computedRaster.getDownloadURL({
        name: `${indexType}_custom_export`,
        scale: satellite === "landsat8" ? 30 : 10,
        filePerBand: false,
        format: "GEO_TIFF",
        region: customRegion // Coupe l'image exactement selon les coordonnées envoyées
      }, (url: string, err: any) => {
        if (err) return reject(err);
        resolve(url);
      });
    });

    return NextResponse.json({ success: true, url: downloadUrl });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}