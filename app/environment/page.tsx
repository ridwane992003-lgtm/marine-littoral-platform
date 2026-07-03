export default function EnvironmentPage() {
  const factors = [
    { name: "Température", value: "18°C", type: "Abiotique" },
    { name: "Salinité", value: "35 PSU", type: "Abiotique" },
    { name: "pH", value: "8.2", type: "Abiotique" },
    { name: "Couverture végétale", value: "45%", type: "Biotique" },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900">Facteurs biotiques et abiotiques</h1>
        <p className="mt-2 text-slate-600">Suivi des conditions environnementales</p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {factors.map((factor) => (
          <div key={factor.name} className="rounded-lg border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900">{factor.name}</h3>
            <p className="mt-2 text-2xl font-bold text-marine">{factor.value}</p>
            <p className="text-sm text-slate-600">{factor.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
