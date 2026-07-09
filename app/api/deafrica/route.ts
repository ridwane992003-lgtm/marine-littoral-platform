import { NextResponse } from "next/server";
import { execFile } from "child_process";
import path from "path";

export async function POST(request: Request) {
  try {
    const { indexType, year, satellite, polygonCoords } = await request.json();

    // 1. Validation des coordonnées du polygone
    if (!polygonCoords || !Array.isArray(polygonCoords) || polygonCoords.length === 0) {
      return NextResponse.json(
        { success: false, error: "Les coordonnées du polygone sont invalides ou manquantes." }, 
        { status: 400 }
      );
    }

    // 2. Sécurisation et normalisation de l'ordre [Longitude, Latitude] pour le standard SIG
    const formattedCoords = polygonCoords.map((coord: number[]) => {
      if (Math.abs(coord[0]) < Math.abs(coord[1])) {
        return [coord[1], coord[0]]; // Inverse si la carte a envoyé [Lat, Lng]
      }
      return [coord[0], coord[1]];
    });

    const lngs = formattedCoords.map((coord: number[]) => coord[0]);
    const lats = formattedCoords.map((coord: number[]) => coord[1]);
    const bboxArray = [Math.min(...lngs), Math.min(...lats), Math.max(...lngs), Math.max(...lats)];

    // 3. Mappage dynamique de la collection selon le satellite choisi par l'utilisateur
    let collection = "gm_s2_annual"; // Par défaut : Sentinel-2 géomédiane annuelle
    
    if (satellite === "landsat8") {
      collection = "ls8_c2_geometric_median";
    } else if (satellite === "landsat7") {
      collection = "ls7_c2_geometric_median";
    } else if (satellite === "copernicus_s2_raw") {
      collection = "s2_l2a"; // Images Sentinel-2 brutes
    }

    const stacEndpoint = "https://explorer.digitalearth.africa/stac/search";
    
    // 4. Requête vers le catalogue STAC de Digital Earth Africa
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

    // 5. Vérification si le serveur distant renvoie bien du JSON (et non une erreur HTML)
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await response.text();
      console.error("Réponse non-JSON reçue de DE Africa:", errorText);
      return NextResponse.json({ 
        success: false, 
        error: `Le catalogue d'images a renvoyé un format invalide (Code ${response.status}). Modifiez l'année ou l'emplacement.` 
      }, { status: response.status });
    }

    const stacData = await response.json();

    if (!stacData.features || stacData.features.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: `Aucune image disponible pour le satellite [${satellite.toUpperCase()}] en ${year} sur cette zone.` 
      }, { status: 404 });
    }

    const feature = stacData.features[0];
    let downloadUrl = "";

    // 6. Extraction de l'asset d'indice ou visuel demandé
    if (indexType === "ndvi" && feature.assets.ndvi) {
      downloadUrl = feature.assets.ndvi.href;
    } else if (feature.assets.visual) {
      downloadUrl = feature.assets.visual.href;
    } else {
      downloadUrl = feature.assets.red?.href || Object.values(feature.assets)[0].href;
    }

    // 7. Correction du protocole : Convertit s3:// en URL HTTPS AWS publique et stable
    if (downloadUrl.startsWith("s3://deafrica-services/")) {
      downloadUrl = downloadUrl.replace("s3://deafrica-services/", "https://deafrica-services.s3.af-south-1.amazonaws.com/");
    }

    // 8. EXÉCUTION DU SCRIPT R POUR L'ANALYSE ET LE RENDU EN DIRECT (LOCAL)
    const scriptPath = path.join(process.cwd(), "scripts", "process_satellite.R");

    const runRScript = () => {
      return new Promise((resolve, reject) => {
        execFile("Rscript", [scriptPath, downloadUrl], (error, stdout, stderr) => {
          if (error || stderr) {
            console.warn("RScript a rencontré un avertissement/erreur:", stderr || error);
            reject(error || stderr);
          } else {
            resolve(stdout.trim());
          }
        });
      });
    };

    try {
      await runRScript();
      // Si le traitement R réussit, on renvoie le GeoTIFF original et l'aperçu généré sous R
      return NextResponse.json({ 
        success: true, 
        url: downloadUrl, 
        render: "/output_render.png" 
      });
    } catch (rError) {
      // Si R n'est pas configuré sur le serveur (ex: en production sur Vercel), on renvoie quand même le lien du GeoTIFF
      return NextResponse.json({ 
        success: true, 
        url: downloadUrl, 
        render: null,
        info: "Rendu local R indisponible dans cet environnement d'hébergement."
      });
    }

  } catch (error: any) {
    console.error("Erreur critique STAC Pipeline:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}