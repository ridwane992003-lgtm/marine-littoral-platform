"use client";

import dynamic from "next/dynamic";

// Importation dynamique de la carte pour éviter les erreurs de rendu côté serveur (SSR)
const InteractiveMap = dynamic(() => import("@/components/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100">
      <p className="text-slate-500 text-sm animate-pulse">Chargement de la carte interactive...</p>
    </div>
  )
});

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      
      {/* En-tête */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          Vue générale des observations, campagnes, cartes et indicateurs.
        </p>
      </div>

      {/* Grille des indicateurs (Statistiques de la maquette) */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Espèces suivies</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">128</p>
          <p className="mt-1 text-xs text-slate-400">Base d'observations marines</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Campagnes</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">12</p>
          <p className="mt-1 text-xs text-slate-400">Actives et planifiées</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Stations</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">34</p>
          <p className="mt-1 text-xs text-slate-400">Points de mesure abiotiques</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Mares détectées</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">57</p>
          <p className="mt-1 text-xs text-slate-400">Issues des traitements d'imagerie</p>
        </div>
      </div>

      {/* Section de la carte fonctionnelle */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">Carte interactive</h2>
        <InteractiveMap />
      </div>

    </div>
  );
}