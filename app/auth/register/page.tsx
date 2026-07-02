export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md card">
      <h1 className="text-2xl font-bold text-marine">Créer un compte</h1>

      <form className="mt-6 space-y-4">
        <input className="input" type="text" placeholder="Nom complet" />
        <input className="input" type="email" placeholder="Email" />
        <input className="input" type="password" placeholder="Mot de passe" />
        <button type="button" className="btn w-full justify-center">
          S'inscrire
        </button>
      </form>
    </div>
  );
}
