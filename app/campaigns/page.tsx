import { campaigns } from "@/lib/mock-data";

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-marine">Campagnes terrain</h1>
        <p className="mt-2 text-slate-600">
          Organisation des collectes, observations et modèles de terrain.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-semibold">Liste des campagnes</h2>
          <div className="mt-4 space-y-4">
            {campaigns.map((c) => (
              <div key={c.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{c.title}</h3>
                  <span className="text-sm text-slate-500">{c.status}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">Zone : {c.zone}</p>
                <p className="text-sm text-slate-600">Date : {c.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold">Nouvelle campagne</h2>
          <form className="mt-4 space-y-4">
            <input className="input" placeholder="Nom de la campagne" />
            <input className="input" placeholder="Zone d'étude" />
            <input className="input" placeholder="Coordonnées / site" />
            <textarea
              className="input min-h-32"
              placeholder="Description, protocoles, modèles de terrain..."
            />
            <button type="button" className="btn">
              Enregistrer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
