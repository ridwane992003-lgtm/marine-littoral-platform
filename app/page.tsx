import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-marine to-algae p-10 text-white">
        <h1 className="text-4xl font-bold">Litto-Watch</h1>
        <p className="mt-4 max-w-3xl text-lg text-cyan-50">
          Plateforme web pour centraliser les observations d'espèces,
          les facteurs biotiques et abiotiques, les campagnes terrain,
          les cartes, la télédétection et la prédiction des mares.
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            href="/auth/register"
            className="rounded-xl bg-white px-5 py-3 font-medium text-marine"
          >
            Créer un compte
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl border border-white px-5 py-3 font-medium text-white"
          >
            Voir le dashboard
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="card">
          <h2 className="text-lg font-semibold">Biodiversité</h2>
          <p className="mt-2 text-slate-600">
            Suivi des espèces marines et littorales.
          </p>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold">Télédétection</h2>
          <p className="mt-2 text-slate-600">
            Indices NDVI, NDWI et couches raster.
          </p>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold">Prédiction</h2>
          <p className="mt-2 text-slate-600">
            Modèles pour l'état et l'évolution des mares.
          </p>
        </div>
      </section>
    </div>
  );
}
