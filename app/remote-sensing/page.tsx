"use client";

import { useState } from "react";

export default function RemoteSensingPage() {
  const [satellite, setSatellite] = useState("landsat8");
  const [indexType, setIndexType] = useState("ndvi");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      {/* En-tête */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-bold text-slate-900">Analyse par Télédétection</h1>
        <p className="mt-2 text-sm text-slate-600">
          Outils de traitement d'imagerie satellitaire et d'analyse des indices environnementaux littoraux.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Panneau de configuration des variables */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 h-fit">
          <h2 className="text-lg font-semibold text-slate-800">Configuration du traitement</h2>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Source de données</label>
            <select 
              value={satellite} 
              onChange={(e) => setSatellite(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 focus:outline-none text-sm"
            >
              <option value="landsat8">Landsat 8 OLI</option>
              <option value="sentinel2">Sentinel-2 MSI</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Indice Spectral</label>
            <select 
              value={indexType} 
              onChange={(e) => setIndexType(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 focus:outline-none text-sm"
            >
              <option value="ndvi">NDVI (Indice de Végétation)</option>
              <option value="ndwi">NDWI (Indice d'Eau)</option>
              <option value="mndwi">MNDWI (Indice d'Eau Modifié)</option>
            </select>
          </div>

          <button className="w-full bg-sky-700 text-white py-2 rounded-md font-semibold text-sm hover:bg-sky-800 transition-colors pt-2">
            Calculer l'indice spectral
          </button>
        </div>

        {/* Zone de visualisation de l'imagerie */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[450px]">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-2">Visualisation des bandes</h2>
            <p className="text-xs text-slate-400">Prêt pour l'affichage matriciel (Raster) ou la superposition des signatures spectrales.</p>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-300 p-8 my-4">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-sm font-medium text-slate-900">Aucune imagerie chargée</p>
            <p className="mt-1 text-xs text-slate-500">Sélectionnez vos critères à gauche pour lancer l'analyse de la zone d'étude.</p>
          </div>
        </div>
      </div>
    </div>
  );
}