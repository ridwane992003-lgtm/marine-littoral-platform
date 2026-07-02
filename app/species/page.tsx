import { species } from "@/lib/mock-data";

export default function SpeciesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-marine">Espèces</h1>
        <p className="mt-2 text-slate-600">
          Catalogue initial des espèces marines et littorales.
        </p>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-3">Nom</th>
              <th className="py-3">Type</th>
              <th className="py-3">Habitat</th>
              <th className="py-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {species.map((item) => (
              <tr key={item.id} className="border-b last:border-0">
                <td className="py-3">{item.name}</td>
                <td className="py-3">{item.type}</td>
                <td className="py-3">{item.habitat}</td>
                <td className="py-3">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
