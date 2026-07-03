import { StatCard } from "@/components/StatCard";
import { MapPlaceholder } from "@/components/MapPlaceholder";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-marine">Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Vue générale des observations, campagnes, cartes et indicateurs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatCard
          title="Espèces suivies"
          value="128"
          subtitle="Base d'observations marines et littorales"
        />
        <StatCard
          title="Campagnes"
          value="12"
          subtitle="Actives et planifiées"
        />
        <StatCard
          title="Stations"
          value="34"
          subtitle="Points de mesure abiotiques"
        />
        <StatCard
          title="Mares détectées"
          value="57"
          subtitle="Issues des traitements d'imagerie"
        />
      </div>

      <MapPlaceholder />
    </div>
  );
}
