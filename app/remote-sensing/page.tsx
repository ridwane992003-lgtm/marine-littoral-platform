"use client";

import { useState } from "react";

export default function RemoteSensingPage() {
  const [satellite, setSatellite] = useState("landsat8");
  const [indexType, setIndexType] = useState("ndvi");
  const [dateRange, setDateRange] = useState("2026");
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);
  const [geeStatus, setGeeStatus] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleGEECalculate = async () => {
    setIsLoading(true);
    setIsCalculated(false);
    setDownloadUrl("");
    setGeeStatus("Envoi des paramètres aux serveurs de calcul...");

    try {
      const response = await fetch("/api/gee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ satellite, indexType, dateRange }),
      });

      const data = await response.json();

      if (data.success && data.url) {
        setDownloadUrl(data.url);
        setIsCalculated(true);
        setGeeStatus(`✅ Calcul matriciel terminé ! L'indice ${indexType.toUpperCase()} est prêt pour le téléchargement direct.`);
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
    link.download = `${indexType.toUpperCase()}_${satellite}_${dateRange}.tif`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-bold text-slate-900">Analyse par Télédétection (Cloud Compute)</h1>
        <p className="mt-2 text-sm text-slate-600">
          Calcul d'indices spectraux environnementaux via l'API Google Earth Engine.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Configuration */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 h-fit">
          <h2 className="text-lg font-semibold text-slate-800">Paramètres GEE</h2>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Capteur Spatial</label>
            <select 
              value={satellite} 
              onChange={(e) => setSatellite(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 focus:outline-none text-sm"
            >
              <option value="landsat8">Landsat 8 OLI (Bandes 1-11)</option>
              <option value="sentinel2">Sentinel-2 MSI (Haute Résolution)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Indice à générer</label>
            <select 
              value={indexType} 
              onChange={(e) => setIndexType(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 focus:outline-none text-sm"
            >
              <option value="ndvi">NDVI (Indice de Végétation)</option>
              <option value="ndwi">NDWI (Indice d'Eau McFeeters)</option>
              <option value="mndwi">MNDWI (Indice d'Eau Modifié Xu)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Période d'analyse</label>
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 focus:outline-none text-sm"
            >
              <option value="2026">Données récentes (2026)</option>
              <option value="2025">Archives (2025)</option>
              <option value="2024">Archives (2024)</option>
            </select>
          </div>

          <button 
            type="button"
            disabled={isLoading}
            onClick={handleGEECalculate}
            className="w-full bg-sky-700 text-white py-2 rounded-md font-semibold text-sm hover:bg-sky-800 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Traitement Cloud..." : "Calculer via Google Earth Engine"}
          </button>
        </div>

        {/* Console de sortie & Téléchargement */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[450px]">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-2">Statut du pipeline géospatial</h2>
            <p className="text-xs text-slate-400">Suivi en temps réel de l'exécution des algorithmes sur l'infrastructure Google Cloud.</p>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-900 text-slate-200 font-mono rounded-lg p-6 my-4 shadow-inner text-xs space-y-2 overflow-y-auto">
            {geeStatus ? (
              <div className="w-full space-y-1 text-left">
                <p className="text-sky-400 font-bold">[GEE-API-LOGS]:</p>
                <p className="pl-2 text-green-400 animate-pulse">{geeStatus}</p>
              </div>
            ) : (
              <div className="text-center text-slate-500">
                <p>&gt;_ En attente d'une instruction...</p>
                <p className="text-[10px] mt-1">Configurez le capteur à gauche et lancez le traitement.</p>
              </div>
            )}
          </div>

          {/* Bouton de téléchargement */}
          <div className="flex justify-end pt-2 border-t border-slate-100">
            <button
              type="button"
              disabled={!isCalculated}
              onClick={handleDownload}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Télécharger le fichier traité (.TIF)
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}