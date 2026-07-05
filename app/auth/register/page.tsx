"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usersDatabase } from "../usersStore";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institution, setInstitution] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      
      // On sauvegarde les données du propre compte de l'utilisateur
      usersDatabase.users.push({ name, email, institution, password });
      
      setMessage(`✅ Compte créé avec succès pour ${name} !`);
      
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    }, 1000);
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50 px-4 py-12 rounded-xl shadow-sm border border-slate-100">
      <div className="w-full max-w-md space-y-8">
        <h2 className="text-center text-3xl font-bold text-slate-900">Créer un compte Observateur</h2>
        <form className="mt-8 space-y-4 bg-white p-8 rounded-lg shadow-md" onSubmit={handleRegister}>
          {message && <div className="p-3 rounded bg-green-50 text-green-700 text-sm">{message}</div>}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700">Nom complet</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 focus:outline-none" placeholder="Ex: Ridwane Gueye" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Adresse Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 focus:outline-none" placeholder="votre@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Institution</label>
              <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} className="block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 focus:outline-none" placeholder="Université Amadou Mahtar Mbow (UAM)" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Mot de passe</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 focus:outline-none" placeholder="••••••••" />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-sky-700 text-white py-2 rounded-md font-semibold hover:bg-sky-800 disabled:opacity-50 mt-4">
            {isLoading ? "Création..." : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
}