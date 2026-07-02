export default function PredictionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-marine">Prédiction des mares</h1>
        <p className="mt-2 text-slate-600">
          Squelette du module de modélisation pour l'état et l'évolution des mares.
        </p>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold">Variables candidates</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 text-slate-700">
          <div className="rounded-xl bg-slate-50 p-4">NDVI</div>
          <div className="rounded-xl bg-slate-50 p-4">NDWI</div>
          <div className="rounded-xl bg-slate-50 p-4">Pluviométrie</div>
          <div className="rounded-xl bg-slate-50 p-4">Température</div>
          <div className="rounded-xl bg-slate-50 p-4">Salinité</div>
          <div className="rounded-xl bg-slate-50 p-4">Altitude / MNT</div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold">Sorties prévues</h2>
        <ul className="mt-4 list-disc pl-6 space-y-2 text-slate-700">
          <li>Présence/absence d'eau</li>
          <li>Risque d'assèchement</li>
          <li>Classification mare temporaire/permanente</li>
          <li>Carte de probabilité</li>
        </ul>
      </div>
    </div>
  );
}
