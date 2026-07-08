import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { indexType, year, polygonCoords } = await request.json();

    if (!polygonCoords || !Array.isArray(polygonCoords) || polygonCoords.length === 0) {
      return NextResponse.json({ success: false, error: "Les coordonnées du polygone sont invalides ou manquantes." }, { status: 400 });
    }

    // 1. Calcul automatique de la Bounding Box [minLng, minLat, maxLng, maxLat]
    const lngs = polygonCoords.map((coord: number[]) => coord[0]);
    const lats = polygonCoords.map((coord: number[]) => coord[1]);
    const bboxArray = [Math.min(...lngs), Math.min(...lats), Math.max(...lngs), Math.max(...lats)];

    // 2. Sélection de la collection selon l'historique demandé
    const selectedYear = parseInt(year);
    const collection = selectedYear < 2017 ? "ls8_c2_geometric_median" : "gm_s2_annual";

    const stacEndpoint = "https://explorer.digitalearth.africa/stac/search";
    
    // 3. Requête vers le catalogue STAC de Digital Earth Africa
    const response = await fetch(stacEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bbox: bboxArray,
        collections: [collection],
        datetime: `${year}-01-01T00:00:00Z/${year}-12-31T23:59:59Z`,
        limit: 1
      }),
    });

    const stacData = await response.json();

    if (!stacData.features || stacData.features.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: `Aucune image disponible pour l'année ${year} sur cette zone.` 
      }, { status: 404 });
    }

    const feature = stacData.features[0];
    let downloadUrl = "";

    // 4. Extraction de la bande ou de l'indice
    if (indexType === "ndvi" && feature.assets.ndvi) {
      downloadUrl = feature.assets.ndvi.href;
    } else if (feature.assets.visual) {
      downloadUrl = feature.assets.visual.href;
    } else {
      downloadUrl = feature.assets.red?.href || Object.values(feature.assets)[0].href;
    }

    // 5. CORRECTION : Convertit l'adresse s3:// en lien HTTPS public téléchargeable
    if (downloadUrl.startsWith("s3://")) {
      downloadUrl = downloadUrl.replace("s3://", "https://data.digitalearth.africa/");
    }

    return NextResponse.json({ success: true, url: downloadUrl });

  } catch (error: any) {
    console.error("Erreur STAC Pipeline:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}