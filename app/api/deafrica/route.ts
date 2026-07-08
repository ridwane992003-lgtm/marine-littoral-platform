import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { indexType, year, bbox } = await request.json();

    if (!bbox) {
      return NextResponse.json({ success: false, error: "Coordonnées de zone (BBox) manquantes." }, { status: 400 });
    }

    const bboxArray = bbox.split(",").map(Number);
    const selectedYear = parseInt(year);
    const collection = selectedYear < 2017 ? "ls8_c2_geometric_median" : "gm_s2_annual";

    const stacEndpoint = "https://explorer.digitalearth.africa/stac/search";
    
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
        error: `Aucune image satellite disponible pour l'année ${year} sur cette zone.` 
      }, { status: 404 });
    }

    const feature = stacData.features[0];
    let downloadUrl = "";

    if (indexType === "ndvi" && feature.assets.ndvi) {
      downloadUrl = feature.assets.ndvi.href;
    } else if (feature.assets.visual) {
      downloadUrl = feature.assets.visual.href;
    } else {
      downloadUrl = feature.assets.red?.href || Object.values(feature.assets)[0].href;
    }

    return NextResponse.json({ success: true, url: downloadUrl });

  } catch (error: any) {
    console.error("Erreur STAC Pipeline:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}