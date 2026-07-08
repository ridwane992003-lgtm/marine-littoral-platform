"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function RemoteSensingPage() {
  const searchParams = useSearchParams();
  const [satellite, setSatellite] = useState("landsat8");
  const [indexType, setIndexType] = useState("ndvi");
  const [dateRange, setDateRange] = useState("2026");
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);
  const [geeStatus, setGeeStatus] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [coords, setCoords] = useState<string | null>(null);

  // Récupération automatique des coordonnées envoyées par la carte
  useEffect(() => {
    const bbox = searchParams.get("bbox");
    if (bbox) {
      setCoords(bbox);
      setGeeStatus(`📍 Coordonnées géographiques détectées depuis la carte : [${bbox}]`);
    }
  }, [searchParams]);

  const handleGEECalculate = async () => {
    if (!coords) {
      setGeeStatus("⚠️ Erreur : Veuillez d'abord sélectionner une zone sur la carte du Dashboard.");
      return;
    }

    setIsLoading(true);
    setIsCalculated(false);
    setDownloadUrl("");
    setGeeStatus("Envoi des coordonnées personnalisées aux serveurs Google Earth Engine...");

    try {
      const response = await fetch("/api/gee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ satellite, indexType, dateRange, bbox: coords }),
      });

      const data = await response.json();

      if (data.success && data.url) {
        setDownloadUrl(data.url);
        setIsCalculated(true);
        setGeeStatus(`✅ Traitement matriciel optimisé terminé avec succès sur votre zone ! Le GeoTIFF est prêt.`);
      } else {
        setGeeStatus(`❌ Erreur Google Cloud : ${data.error || "Impossible de générer le fichier raster"}`);
      }
    } catch (error) {
      setGeeStatus("❌ Erreur réseau lors de la communication avec le pipeline.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${indexType.toUpperCase()}_${satellite}_CustomZone.tif`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-bold text-slate-900">Analyse par Télédétection Ciblée</h1>
        <p className="mt-2 text-sm text-slate-600">
          Calcul d'indices spectraux sur une zone d'étude restreinte injectée dynamiquement.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Configuration */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 h-fit">
          <h2 className="text-lg font-semibold text-slate-800">Paramètres GEE</h2>
          
          {coords ? (
            <div className="bg-green-50 p-3 rounded-md border border-green-200 text-[11px] text-green-800 font-mono">
              ✔️ Zone active chargée avec succès.
            </div>
          ) : (
            <div className="bg-amber-50 p-3 rounded-md border border-amber-200 text-xs text-amber-800">
              ⚠️ Aucune zone sélectionnée. Retournez sur la carte du Dashboard pour choisir vos coordonnées.
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Capteur Spatial</label>
            <select value={satellite} onChange={(e) => setSatellite(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 text-sm">
              <option value="landsat8">Landsat 8 OLI</option>
              <option value="sentinel2">Sentinel-2 MSI</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Indice à générer</label>
            <select value={indexType} onChange={(e) => setIndexType(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 text-sm">
              <option value="ndvi">NDVI (Végétation)</option>
              <option value="ndwi">NDWI (Eau McFeeters)</option>
              <option value="mndwi">MNDWI (Eau Modifié Xu)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Période d'analyse</label>
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 text-sm">
              <option value="2026">Données récentes (2026)</option>
              <option value="2025">Archives (2025)</option>
            </select>
          </div>

          <button 
            type="button" 
            disabled={isLoading || !coords} 
            onClick={handleGEECalculate} 
            className="w-full bg-sky-700 text-white py-2 rounded-md font-semibold text-sm hover:bg-sky-800 transition-colors disabled:opacity-40"
          >
            {isLoading ? "Traitement GEE en cours..." : "Calculer sur ma zone"}
          </button>
        </div>

        {/* Console de sortie & Téléchargement */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[450px]">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-2">Logs d'exécution Cloud</h2>
            <p className="text-xs text-slate-400">Suivi du traitement d'extraction pixellaire.</p>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-900 text-slate-200 font-mono rounded-lg p-6 my-4 shadow-inner text-xs space-y-2">
            {geeStatus ? (
              <div className="w-full text-left font-mono text-[11px]">
                <p className="text-sky-400 font-bold">[SYSTEM]:</p>
                <p className="pl-2 text-green-400">{geeStatus}</p>
              </div>
            ) : (
              <p className="text-slate-500">&gt;_ En attente de coordonnées cartographiques...</p>
            )}
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-100">
            <button
              type="button"
              disabled={!isCalculated}
              onClick={handleDownload}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-emerald-700 disabled:opacity-40 transition-colors"
            >
              Télécharger le fichier extrait (.TIF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}