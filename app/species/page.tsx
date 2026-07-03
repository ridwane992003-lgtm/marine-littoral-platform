export default function SpeciesPage() {
  const species = [
    { name: "Zostère marine", type: "Plante", status: "Présent" },
    { name: "Crabe dormeur", type: "Crustacé", status: "Absent" },
    { name: "Dauphins", type: "Mammifère", status: "Présent" },
    { name: "Algues rouges", type: "Algue", status: "Présent" },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900">Gestion des espèces</h1>
        <p className="mt-2 text-slate-600">Suivi des espèces marines et littorales</p>
      </section>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Espèce</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {species.map((s) => (
              <tr key={s.name} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-slate-900">{s.name}</td>
                <td className="px-6 py-4 text-slate-600">{s.type}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                    s.status === "Présent"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
