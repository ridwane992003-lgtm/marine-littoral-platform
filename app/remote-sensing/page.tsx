"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function DEAfricaContent() {
  const searchParams = useSearchParams();
  const [indexType, setIndexType] = useState("ndvi");
  const [year, setYear] = useState("2025");
  const [satellite, setSatellite] = useState("sentinel2");
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);
  const [status, setStatus] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [renderUrl, setRenderUrl] = useState(""); // Stocke l'aperçu généré par R
  const [polygonData, setPolygonData] = useState<any | null>(null);

  useEffect(() => {
    const polyParam = searchParams.get("poly");
    if (polyParam) {
      try {
        const decodedPoly = JSON.parse(decodeURIComponent(polyParam));
        setPolygonData(decodedPoly);
        setStatus("📍 Zone d'étude chargée. Prête pour l'extraction multi-satellite !");
      } catch (err) {
        setStatus("❌ Erreur de décodage des coordonnées géométriques.");
      }
    }
  }, [searchParams]);

  const handleDEAfricaSearch = async () => {
    if (!polygonData) {
      setStatus("⚠️ Veuillez tracer une zone d'étude sur la carte du Dashboard d'abord.");
      return;
    }

    setIsLoading(true);
    setIsCalculated(false);
    setDownloadUrl("");
    setRenderUrl(""); // Réinitialise l'ancien rendu pendant le chargement
    setStatus(`Recherche dans le catalogue [${satellite.toUpperCase()}] pour l'année ${year}...`);

    try {
      const response = await fetch("/api/deafrica", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ indexType, year, satellite, polygonCoords: polygonData }),
      });

      const data = await response.json();

      if (data.success && data.url) {
        setDownloadUrl(data.url);
        
        // Si R a généré un aperçu, on l'affiche en forçant le navigateur à ignorer le cache
        if (data.render) {
          setRenderUrl(`${data.render}?t=${Date.now()}`);
          setStatus(`✅ Donnée extraite et traitée par R ! L'aperçu et le fichier GeoTIFF calibré sont prêts.`);
        } else {
          setStatus(`✅ Donnée extraite avec succès ! Le fichier GeoTIFF est prêt (Aperçu R non disponible).`);
        }
        
        setIsCalculated(true);
      } else {
        setStatus(`❌ Limite de données : ${data.error || "Aucune correspondance trouvée"}`);
      }
    } catch (error) {
      setStatus("❌ Erreur réseau lors de la requête STAC.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Panneau de configuration */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 h-fit">
        <h2 className="text-lg font-semibold text-slate-800">Configuration de l'extraction</h2>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">1. Choisir le Satellite</label>
          <select value={satellite} onChange={(e) => setSatellite(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-600 bg-white">
            <option value="sentinel2">Sentinel-2 (Copernicus / Haute Résolution)</option>
            <option value="landsat8">Landsat 8 (NASA / OLI)</option>
            <option value="landsat7">Landsat 7 (Historique ETM+)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">2. Saisir l'Année d'étude</label>
          <input 
            type="number" 
            min="1984" 
            max="2026" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-600 font-mono font-bold"
            placeholder="Ex: 2024"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">3. Produit / Indice Spectral</label>
          <select value={indexType} onChange={(e) => setIndexType(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-600">
            <option value="ndvi">Vrai NDVI (Indice Normalisé de Végétation)</option>
            <option value="visual">Couleurs Naturelles (RGB Recomposé)</option>
          </select>
        </div>

        <button type="button" disabled={isLoading || !polygonData} onClick={handleDEAfricaSearch} className="w-full bg-sky-700 text-white py-2 rounded-md font-semibold text-sm hover:bg-sky-800 transition-colors disabled:opacity-40">
          {isLoading ? "Extraction en cours..." : "Lancer la télédétection"}
        </button>
      </div>

      {/* Console d'affichage */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[450px]">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Statut du Pipeline Spatial</h2>
          <p className="text-xs text-slate-400">Filtrage dynamique des scènes de données raster ouverts.</p>
        </div>
        
        <div className="flex-1 flex flex-col justify-between bg-slate-900 text-slate-200 font-mono rounded-lg p-6 my-4 text-xs">
          <div className="w-full text-left font-mono text-[11px]">
            <p className="text-sky-400 font-bold">[LITTO-WATCH-STAC]:</p>
            <p className="pl-2 text-green-400">{status || ">_ En attente de configuration."}</p>
          </div>

          {/* Affichage dynamique du rendu généré par R */}
          {renderUrl && (
            <div className="mt-4 border border-slate-700 rounded-lg overflow-hidden bg-slate-950 p-3 text-center">
              <p className="text-[10px] text-sky-400 mb-2 text-left">📊 Aperçu cartographique généré par RStudio :</p>
              <img src={renderUrl} alt="Rendu R" className="max-h-60 mx-auto object-contain rounded border border-slate-800 shadow-md bg-slate-900" />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer" download className={`bg-emerald-600 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-emerald-700 transition-all ${!isCalculated ? "opacity-40 pointer-events-none" : ""}`}>
            Télécharger l'image GeoTIFF (.TIF)
          </a>
        </div>
      </div>
    </div>
  );
}

export default function RemoteSensingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-bold text-slate-900">Analyse Multi-Capteurs Personnalisée</h1>
        <p className="mt-2 text-sm text-slate-600">Choisissez votre satellite et vos fenêtres temporelles pour l'étude diachronique du littoral.</p>
      </div>
      <Suspense fallback={<div>Chargement des modules de traitement...</div>}>
        <DEAfricaContent />
      </Suspense>
    </div>
  );
}