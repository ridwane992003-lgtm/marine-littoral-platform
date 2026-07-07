import { NextResponse } from "next/server";
// @ts-ignore
import ee from "@google/earthengine";

// Initialisation de Google Earth Engine de manière asynchrone
const initializeGEE = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const clientEmail = process.env.GEE_CLIENT_EMAIL;
    // Nettoyage de la clé privée pour gérer correctement les sauts de ligne \n
    const privateKey = process.env.GEE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!clientEmail || !privateKey) {
      return reject(new Error("Identifiants Google Earth Engine manquants dans le fichier .env.local"));
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
    const { satellite, indexType, dateRange } = await request.json();

    // 1. Authentification auprès de Google
    await initializeGEE();

    // 2. Sélection de la collection d'images selon le capteur choisi
    let collectionId = "LANDSAT/LC08/C02/T1_TOA"; // Par défaut Landsat 8
    if (satellite === "sentinel2") {
      collectionId = "COPERNICUS/S2_SR_HARMONIZED"; // Sentinel-2
    }

    // Filtrage spatial et temporel
    let imageCollection = ee.ImageCollection(collectionId)
      .filterDate(`${dateRange}-01-01`, `${dateRange}-12-31`)
      .sort("CLOUD_COVER");

    const testImage = imageCollection.first();

    // 3. Calcul de l'indice spectral matriciel
    let computedRaster;
    if (indexType === "ndvi") {
      const nirBand = satellite === "landsat8" ? "B5" : "B8";
      computedRaster = testImage.normalizedDifference([nirBand, "B4"]);
    } else if (indexType === "ndwi") {
      const nirBand = satellite === "landsat8" ? "B5" : "B8";
      computedRaster = testImage.normalizedDifference(["B3", nirBand]);
    } else {
      const swirBand = satellite === "landsat8" ? "B6" : "B11";
      computedRaster = testImage.normalizedDifference(["B3", swirBand]);
    }

    // 4. Génération de l'URL de téléchargement direct GeoTIFF par Google
    const downloadUrl = await new Promise<string>((resolve, reject) => {
      // Zone d'intérêt par défaut (Bounding Box autour du Lac Rose, Sénégal)
      const defaultRegion = ee.Geometry.Rectangle([-17.6, 14.5, -17.2, 14.9]);

      computedRaster.getDownloadURL({
        name: `${indexType}_${satellite}_export`,
        scale: satellite === "landsat8" ? 30 : 10, // Résolution spatiale (30m ou 10m)
        filePerBand: false,
        format: "GEO_TIFF",
        region: defaultRegion
      }, (url: string, err: any) => {
        if (err) return reject(err);
        resolve(url);
      });
    });

    return NextResponse.json({ success: true, url: downloadUrl });

  } catch (error: any) {
    console.error("Erreur GEE Pipeline:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}