export default function RegisterPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-marine to-algae p-10 text-white">
        <h1 className="text-3xl font-bold">Créer un compte</h1>
        <p className="mt-2 text-cyan-50">Inscrivez-vous pour accéder à Litto-Watch</p>
      </section>

      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 p-8">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Nom</label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2"
              placeholder="vous@exemple.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Mot de passe</label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2"
              placeholder="••••••••"
            />
          </div>
          <button className="w-full rounded-lg bg-marine py-2 font-medium text-white hover:bg-marine/90">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}
