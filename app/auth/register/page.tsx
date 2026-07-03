export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md card">
      <h1 className="text-2xl font-bold text-marine">Créer un compte</h1>

      <form className="mt-6 space-y-4">
        <input 
          id="fullname" 
          name="fullname" 
          className="input" 
          type="text" 
          placeholder="Nom complet" 
          required 
        />
        <input 
          id="email" 
          name="email" 
          className="input" 
          type="email" 
          placeholder="Email" 
          required 
        />
        <input 
          id="password" 
          name="password" 
          className="input" 
          type="password" 
          placeholder="Mot de passe" 
          required 
        />
        <button type="submit" className="btn w-full justify-center">
          S'inscrire
        </button>
      </form>
    </div>
  );
}
