"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function DEAfricaContent() {
  const searchParams = useSearchParams();
  const [indexType, setIndexType] = useState("ndvi");
  const [year, setYear] = useState("2025");
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);
  const [status, setStatus] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [polygonData, setPolygonData] = useState<any | null>(null);

  // Récupération automatique du polygone dessiné sur la carte
  useEffect(() => {
    const polyParam = searchParams.get("poly");
    if (polyParam) {
      try {
        const decodedPoly = JSON.parse(decodeURIComponent(polyParam));
        setPolygonData(decodedPoly);
        setStatus(`📍 Zone personnalisée reçue avec succès ! (${decodedPoly.length - 1} sommets détectés)`);
      } catch (err) {
        setStatus("❌ Erreur lors du décodage des coordonnées du polygone.");
      }
    }
  }, [searchParams]);

  const handleDEAfricaSearch = async () => {
    if (!polygonData) {
      setStatus("⚠️ Erreur : Veuillez d'abord dessiner une zone sur la carte du Dashboard.");
      return;
    }

    setIsLoading(true);
    setIsCalculated(false);
    setDownloadUrl("");
    setStatus(`Extraction haut débit depuis Digital Earth Africa pour l'année ${year}...`);

    try {
      const response = await fetch("/api/deafrica", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          indexType, 
          year, 
          polygonCoords: polygonData 
        }),
      });

      const data = await response.json();

      if (data.success && data.url) {
        setDownloadUrl(data.url);
        setIsCalculated(true);
        setStatus(`✅ Image historique trouvée dans le cloud AWS ! Votre fichier GeoTIFF est prêt.`);
      } else {
        setStatus(`❌ Problème : ${data.error || "Aucune archive trouvée"}`);
      }
    } catch (error) {
      setStatus("❌ Erreur de communication avec le serveur d'analyse.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Configuration */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 h-fit">
        <h2 className="text-lg font-semibold text-slate-800">Analyse Temporelle Personnalisée</h2>

        {polygonData ? (
          <div className="bg-green-50 p-3 rounded-md border border-green-200 text-[11px] text-green-800 font-mono break-all">
            ✔️ Polygone actif : {polygonData.length - 1} points enregistrés.
          </div>
        ) : (
          <div className="bg-amber-50 p-3 rounded-md border border-amber-200 text-xs text-amber-800">
            ⚠️ Aucun polygone reçu. Allez sur la carte pour tracer votre zone d'étude à la souris.
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Choisir l'année de l'archive</label>
          <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-700 bg-sky-50 font-bold">
            <option value="2025">2025 (Données récentes)</option>
            <option value="2020">2020 (Moyenne période)</option>
            <option value="2015">2015 (Entrée Sentinel-2 / Landsat 8)</option>
            <option value="2010">2010 (Archives Landsat 7)</option>
            <option value="2000">2000 (An 2000)</option>
            <option value="1990">1990 (Il y a 36 ans)</option>
            <option value="1985">1985 (Données initiales de référence)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Indice produit</label>
          <select value={indexType} onChange={(e) => setIndexType(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-700">
            <option value="ndvi">NDVI (Indice de Végétation / Algues)</option>
            <option value="visual">Image brute (Couleurs Réelles RGB)</option>
          </select>
        </div>

        <button 
          type="button" 
          disabled={isLoading || !polygonData} 
          onClick={handleDEAfricaSearch} 
          className="w-full bg-sky-700 text-white py-2 rounded-md font-semibold text-sm hover:bg-sky-800 transition-colors disabled:opacity-40"
        >
          {isLoading ? "Recherche en cours..." : "Extraire l'archive de mon polygone"}
        </button>
      </div>

      {/* Console */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[450px]">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Console Digital Earth Africa</h2>
          <p className="text-xs text-slate-400">Interconnexion directe avec les serveurs STAC ouverts.</p>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-900 text-slate-200 font-mono rounded-lg p-6 my-4 text-xs">
          {status ? (
            <div className="w-full text-left font-mono text-[11px]">
              <p className="text-sky-400 font-bold">[DE-AFRICA-STAC]:</p>
              <p className="pl-2 text-green-400">{status}</p>
            </div>
          ) : (
            <p className="text-slate-500">&gt;_ En attente du tracé cartographique...</p>
          )}
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            type="button"
            disabled={!isCalculated}
            onClick={() => window.open(downloadUrl, "_blank")}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-emerald-700 disabled:opacity-40"
          >
            Télécharger le GeoTIFF personnalisé (.TIF)
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RemoteSensingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-bold text-slate-900">Analyse Historique à la Demande</h1>
        <p className="mt-2 text-sm text-slate-600">
          Extraction haut débit depuis le catalogue Digital Earth Africa sur votre zone personnalisée.
        </p>
      </div>
      <Suspense fallback={<div>Chargement du catalogue...</div>}>
        <DEAfricaContent />
      </Suspense>
    </div>
  );
}