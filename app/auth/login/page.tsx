export default function LoginPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-marine to-algae p-10 text-white">
        <h1 className="text-3xl font-bold">Connexion</h1>
        <p className="mt-2 text-cyan-50">Connectez-vous à votre compte Litto-Watch</p>
      </section>

      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 p-8">
        <form className="space-y-4">
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
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
