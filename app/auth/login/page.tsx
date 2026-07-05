"use client";

import { useState } from "react";

export default function RemoteSensingPage() {
  const [selectedLayer, setSelectedLayer] = useState("true-color");
  const [zoomLevel, setZoomLevel] = useState(12);
  const [selectedZone, setSelectedZone] = useState("Lac Rose");

  // Simulation des données de bandes spectrales selon l'indice choisi
  const layerInfo = {
    "true-color": {
      title: "Couleurs Réelles (RGB)",
      description: "Combinaison des bandes 4 (Rouge), 3 (Vert) et 2 (Bleu) de Landsat 8. Idéal pour une observation visuelle standard.",
      colorClass: "bg-emerald-900",
      stats: "Réflectance standard du sol et de l'eau."
    },
    "ndvi": {
      title: "Indice de Végétation (NDVI)",
      description: "Calculé à partir du Proche Infrarouge (B5) et du Rouge (B4). Met en évidence la santé de la couverture végétale et cible d'éventuelles anomalies ou maladies.",
      colorClass: "bg-gradient-to-br from-green-500 to-yellow-300",
      stats: "Valeurs comprises entre -0.1 (eau) et +0.6 (végétation dense)."
    },
    "ndwi": {
      title: "Indice d'Eau Différentiel (NDWI)",
      description: "Utilise le Vert (B3) et le Proche Infrarouge (B5) pour cartographier les corps d'eau et mesurer l'humidité de la zone littorale.",
      colorClass: "bg-gradient-to-br from-blue-600 to-cyan-400",
      stats: "Valeurs positives indiquant des surfaces d'eau libres claires."
    }
  };

  const currentLayer = layerInfo[selectedLayer as keyof typeof layerInfo];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Console de Télédétection Satellitaire</h1>
          <p className="text-sm text-slate-500 mt-1">Analyse des indices biophysiques à partir des données de réflectance Landsat 8</p>
        </div>
        
        {/* Sélecteur de zone interactif */}
        <div className="mt-4 md:mt-0">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">Zone d'étude</label>
          <select 
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="block w-full rounded-md border-slate-300 py-1.5 pl-3 pr-10 text-slate-950 font-medium border focus:outline-none focus:ring-2 focus:ring-sky-700 sm:text-sm"
          >
            <option value="Lac Rose">Lac Rose & Zones Environnantes</option>
            <option value="Grande Cote">Grande Côte Littorale</option>
            <option value="Langue de Barbarie">Langue de Barbarie</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Panneau de contrôle à gauche (Les boutons d'action) */}
        <div className="lg:col-span-1 space-y-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">Couches Spectrales</h2>
          
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setSelectedLayer("true-color")}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedLayer === "true-color" ? "bg-sky-700 text-white shadow-sm" : "bg-slate-50 text-slate-700 hover:bg-slate-100"}`}
            >
              📷 Couleurs Réelles (RGB)
            </button>
            
            <button
              onClick={() => setSelectedLayer("ndvi")}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedLayer === "ndvi" ? "bg-sky-700 text-white shadow-sm" : "bg-slate-50 text-slate-700 hover:bg-slate-100"}`}
            >
              🌿 Indice Végétation (NDVI)
            </button>
            
            <button
              onClick={() => setSelectedLayer("ndwi")}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedLayer === "ndwi" ? "bg-sky-700 text-white shadow-sm" : "bg-slate-50 text-slate-700 hover:bg-slate-100"}`}
            >
              💧 Indice de l'Eau (NDWI)
            </button>
          </div>

          <hr className="my-4 border-slate-100" />

          {/* Contrôles de carte simulant les actions de zoom */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Outils Cartographiques</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setZoomLevel(prev => Math.min(prev + 1, 18))}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-1 px-2 rounded text-center text-sm"
              >
                Zoom +
              </button>
              <button 
                onClick={() => setZoomLevel(prev => Math.max(prev - 1, 8))}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-1 px-2 rounded text-center text-sm"
              >
                Zoom -
              </button>
            </div>
            <div className="text-xs text-center text-slate-400 font-mono mt-1">Niveau de Zoom : {zoomLevel}/18</div>
          </div>
        </div>

        {/* Zone d'affichage centrale de la carte satellite */}
        <div className="lg:col-span-3 space-y-4">
          <div className="relative h-[450px] w-full rounded-xl border border-slate-200 bg-slate-900 shadow-inner flex flex-col items-center justify-center overflow-hidden">
            
            {/* Simulation de la carte visuelle dynamique selon le choix */}
            <div className={`absolute inset-0 opacity-40 transition-all duration-500 ${currentLayer.colorClass}`} />
            
            {/* Repères cartographiques factices */}
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-mono z-10">
              Région : {selectedZone} | Lat: 14.803° N / Lon: -17.228° W
            </div>

            <div className="z-10 text-center px-4 max-w-md">
              <div className="text-6xl mb-4 animate-pulse">🛰️</div>
              <h3 className="text-xl font-bold text-white mb-2">{currentLayer.title}</h3>
              <p className="text-sm text-slate-300 font-mono bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                Aperçu matriciel simulé pour le traitement d'images Landsat 8.
              </p>
            </div>
            
            {/* Échelle graphique */}
            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] font-mono">
              Échelle approx: 1 : 25,000
            </div>
          </div>

          {/* Légende dynamique explicative */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 space-y-2">
            <h4 className="text-md font-bold text-slate-800">Interprétation de la couche sélectionnée</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{currentLayer.description}</p>
            <div className="text-xs inline-block bg-sky-50 text-sky-800 font-medium px-2.5 py-1 rounded-md mt-2">
              <strong>Donnée brute :</strong> {currentLayer.stats}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}