import { StatCard } from "@/components/StatCard";
import { MapPlaceholder } from "@/components/MapPlaceholder";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">Vue d'ensemble des données marines et littorales</p>
      </section>

      <div className="grid gap-6 md:grid-cols-4">
        <StatCard title="Espèces observées" value="342" change="+12% ce mois" />
        <StatCard title="Campagnes actives" value="8" change="3 en cours" />
        <StatCard title="Prédictions" value="156" change="+5 cette semaine" />
        <StatCard title="Utilisateurs" value="24" change="+2 nouveaux" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold">Activité récente</h2>
          <p className="mt-4 text-slate-600">Aucune activité pour le moment</p>
        </div>
        <MapPlaceholder />
      </div>
    </div>
  );
}
