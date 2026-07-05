"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usersDatabase } from "../usersStore";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    setTimeout(() => {
      setIsLoading(false);
      
      // Recherche de l'utilisateur dans notre base de données simulée
      const userExists = usersDatabase.users.find(
        (user) => user.email === email && user.password === password
      );

      // Compte admin par défaut ou utilisateur nouvellement inscrit
      if (userExists || (email === "admin@litto.sn" && password === "password")) {
        const activeUser = userExists ? userExists.name : "Administrateur";
        setMessage(`✅ Connexion réussie ! Bienvenue ${activeUser}`);
        setTimeout(() => {
          router.push("/dashboard"); 
        }, 1200);
      } else {
        setMessage("❌ Aucun compte trouvé avec ces identifiants.");
      }
    }, 1000);
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50 px-4 py-12 rounded-xl shadow-sm border border-slate-100">
      <div className="w-full max-w-md space-y-8">
        <h2 className="text-center text-3xl font-bold text-slate-900">Connexion à Litto-Watch</h2>
        <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
          {message && <div className={`p-3 rounded text-sm ${message.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{message}</div>}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Adresse Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Mot de passe</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 focus:outline-none" />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-sky-700 text-white py-2 rounded-md font-semibold hover:bg-sky-800 disabled:opacity-50">
            {isLoading ? "Vérification..." : "Se connecter"}
          </button>
        </form>
        <p className="text-center text-sm text-slate-600">
          Pas encore de compte ? <a href="/auth/register" className="font-medium text-sky-700 hover:text-sky-600">Créer un compte</a>
        </p>
      </div>
    </div>
  );
}