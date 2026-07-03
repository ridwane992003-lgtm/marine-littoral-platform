export default function PredictionPage() {
  const predictions = [
    { location: "Mare A", status: "Eau", confidence: "92%" },
    { location: "Mare B", status: "Asséchée", confidence: "87%" },
    { location: "Mare C", status: "Eau", confidence: "95%" },
    { location: "Mare D", status: "En cours de dessèchement", confidence: "78%" },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900">Prédiction des mares</h1>
        <p className="mt-2 text-slate-600">Modèles prédictifs de l'état des mares littorales</p>
      </section>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Localisation</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Statut prédit</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Confiance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {predictions.map((pred) => (
              <tr key={pred.location} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-slate-900">{pred.location}</td>
                <td className="px-6 py-4 text-slate-600">{pred.status}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-20 bg-slate-200 rounded-full">
                      <div
                        className="h-full bg-marine rounded-full"
                        style={{ width: pred.confidence }}
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{pred.confidence}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
