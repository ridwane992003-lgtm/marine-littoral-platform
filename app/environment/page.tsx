import { abioticFactors } from "@/lib/mock-data";

export default function EnvironmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-marine">
          Facteurs biotiques et abiotiques
        </h1>
        <p className="mt-2 text-slate-600">
          Base initiale des variables environnementales à suivre.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-semibold">Facteurs abiotiques</h2>
          <ul className="mt-4 space-y-3">
            {abioticFactors.map((factor) => (
              <li
                key={factor.name}
                className="flex items-center justify-between border-b pb-2 last:border-0"
              >
                <span>{factor.name}</span>
                <strong>{factor.value}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold">Facteurs biotiques</h2>
          <ul className="mt-4 list-disc pl-6 text-slate-700 space-y-2">
            <li>Abondance des espèces</li>
            <li>Interactions trophiques</li>
            <li>Couverture végétale</li>
            <li>Pression invasive</li>
            <li>Dynamique saisonnière</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
