"use client";

import InteractiveMap from "@/components/InteractiveMap";
import MarineWeather from "@/components/MarineWeather"; // Étape A : On appelle le fichier météo

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
      {/* En-tête */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-bold text-slate-900">Tableau de bord Litto-Watch</h1>
        <p className="mt-2 text-sm text-slate-600">
          Surveillance du littoral et prévisions marines en temps réel.
        </p>
      </div>

      {/* La Carte interactive */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-800">Cartographie spatiale</h3>
        <InteractiveMap />
      </div>

      {/* Le Tableau Météo (La fameuse balise !) */}
      <div className="pt-4">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Données Prédictives</h3>
        <MarineWeather /> 
      </div>
    </div>
  );
}