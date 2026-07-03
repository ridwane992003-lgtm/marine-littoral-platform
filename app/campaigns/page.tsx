export default function CampaignsPage() {
  const campaigns = [
    { name: "Campagne été 2024", location: "Côte nord", status: "En cours", progress: 65 },
    { name: "Étude biodiversité", location: "Baie côtière", status: "Programmée", progress: 20 },
    { name: "Suivi NDVI", location: "Zone A", status: "Complétée", progress: 100 },
    { name: "Inventaire espèces", location: "Littoral sud", status: "En cours", progress: 45 },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900">Campagnes terrain</h1>
        <p className="mt-2 text-slate-600">Gestion des missions d'observation et collecte de données</p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {campaigns.map((campaign) => (
          <div key={campaign.name} className="rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">{campaign.name}</h3>
                <p className="text-sm text-slate-600">{campaign.location}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                campaign.status === "En cours"
                  ? "bg-blue-100 text-blue-800"
                  : campaign.status === "Complétée"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {campaign.status}
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Progression</span>
                <span className="font-medium text-slate-900">{campaign.progress}%</span>
              </div>
              <div className="mt-2 h-2 bg-slate-200 rounded-full">
                <div
                  className="h-full bg-marine rounded-full"
                  style={{ width: `${campaign.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
