import StatCard from "@/components/StatCard";
import MapPlaceholder from "@/components/MapPlaceholder";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      <div className="grid gap-6 md:grid-cols-4">
        <StatCard title="Espèces observées" value="342" change="+12% ce mois" />
        <StatCard title="Campagnes actives" value="8" change="3 en cours" />
        <StatCard title="Prédictions" value="156" change="+5 cette semaine" />
        <StatCard title="Utilisateurs" value="24" change="+2 nouveaux" />
      </div>
      <div className="mt-8">
        <MapPlaceholder />
      </div>
    </div>
  );
}
