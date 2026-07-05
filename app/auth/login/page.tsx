"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Simulation d'une connexion API
    setTimeout(() => {
      setIsLoading(false);
      if (email === "admin@litto.sn" && password === "password") {
        setMessage("✅ Connexion réussie ! Redirection vers le tableau de bord...");
      } else {
        setMessage("❌ Identifiants incorrects (Essayez admin@litto.sn / password)");
      }
    }, 1500);
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 rounded-xl shadow-sm border border-slate-100">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
            Connexion à Litto-Watch
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Plateforme littorale, marine et de télédétection
          </p>
        </div>

        <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
          {message && (
            <div className={`p-3 rounded text-sm font-medium ${message.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {message}
            </div>
          )}

          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-slate-700 mb-1">
                Adresse Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:z-10 focus:border-marine focus:outline-none focus:ring-marine sm:text-sm"
                placeholder="nom@exemple.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:z-10 focus:border-marine focus:outline-none focus:ring-marine sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? "Chargement..." : "Se connecter"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-slate-600">
          Pas encore de compte ?{" "}
          <a href="/auth/register" className="font-medium text-sky-700 hover:text-sky-600">
            Créer un compte d'observateur
          </a>
        </p>
      </div>
    </div>
  );
}