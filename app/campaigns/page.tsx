"use client";

import { useState } from "react";

export default function CampaignsPage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Simulation de l'enregistrement ou future route API
    setTimeout(() => {
      setMessage("✅ Données de la campagne enregistrées avec succès !");
      setTitle("");
      setLocation("");
      setStartDate("");
      setDescription("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="border-b border-slate-200 pb-5 mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Gestion des Campagnes</h1>
        <p className="mt-2 text-sm text-slate-600">
          Bienvenue sur la page des campagnes maritimes. Utilisez le formulaire ci-dessous pour enregistrer vos observations de terrain.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Enregistrer une nouvelle campagne</h2>
        
        {message && (
          <div className="mb-4 p-4 rounded-md bg-green-50 text-green-700 text-sm font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Titre de la campagne</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Suivi de la végétation"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Zone d'étude / Localisation</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Lac Rose, Sénégal"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 focus:outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date de début</label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Observations / Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ajoutez des détails sur les données collectées ou les capteurs utilisés..."
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-700 focus:outline-none text-sm"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-sky-700 text-white px-5 py-2 rounded-md font-semibold text-sm hover:bg-sky-800 disabled:opacity-50 transition-colors"
            >
              {isLoading ? "Enregistrement..." : "Enregistrer la Campagne"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}