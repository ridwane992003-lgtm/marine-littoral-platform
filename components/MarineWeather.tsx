"use client";

import { useState, useEffect } from "react";

interface WeatherData {
  time: string[];
  waveHeight: number[];
  waveDirection: number[];
  wavePeriod: number[];
  windSpeed: number[];
  temperature: number[];
}

// Liste de localités clés pré-enregistrées au Sénégal pour un accès rapide
const LOCALITIES = [
  { name: "Niague / Lac Rose", lat: 14.81, lng: -17.19 },
  { name: "Tivaouane Peulh", lat: 14.79, lng: -17.23 },
  { name: "Yoff / Dakar", lat: 14.76, lng: -17.47 },
  { name: "Saint-Louis", lat: 16.02, lng: -16.50 },
  { name: "Mbour / Saly", lat: 14.41, lng: -16.97 },
];

export default function MarineWeather() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocality, setSelectedLocality] = useState(LOCALITIES[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMarineWeather(selectedLocality.lat, selectedLocality.lng);
  }, [selectedLocality]);

  const fetchMarineWeather = async (lat: number, lng: number) => {
    setIsLoading(true);
    setError("");
    try {
      // 1. API Marine d'Open-Meteo pour les vagues et la houle
      const marineRes = await fetch(
        `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&daily=wave_height_max,wave_direction_dominant,wave_period_max&timezone=GMT`
      );
      const marineData = await marineRes.json();

      // 2. API Classique pour le Vent et la Température à la surface
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,wind_speed_10m_max&timezone=GMT`
      );
      const weatherData = await weatherRes.json();

      if (marineData.daily && weatherData.daily) {
        setWeather({
          time: marineData.daily.time,
          waveHeight: marineData.daily.wave_height_max,
          waveDirection: marineData.daily.wave_direction_dominant,
          wavePeriod: marineData.daily.wave_period_max,
          windSpeed: weatherData.daily.wind_speed_10m_max,
          temperature: weatherData.daily.temperature_2m_max,
        });
      } else {
        throw new Error("Données indisponibles pour cette zone côtière.");
      }
    } catch (err) {
      setError("Impossible de récupérer les données météo marines pour ces coordonnées.");
    } finally {
      setIsLoading(false);
    }
  };

  // Gestion de la recherche de localité personnalisée
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      // Utilisation du géocodeur gratuit d'Open-Meteo pour trouver la ville/zone
      const geocodeRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=1&language=fr&format=json`
      );
      const geocodeData = await geocodeRes.json();

      if (geocodeData.results && geocodeData.results.length > 0) {
        const result = geocodeData.results[0];
        const newLoc = {
          name: `${result.name}, ${result.country || ""}`,
          lat: result.latitude,
          lng: result.longitude,
        };
        setSelectedLocality(newLoc);
        setSearchQuery("");
      } else {
        setError("Localité introuvable. Essayez un autre nom (ex: Cayar, Rufisque).");
      }
    } catch (err) {
      setError("Erreur lors de la recherche géographique.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
      {/* En-tête et Barre de recherche */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Prévisions Météo Marines &amp; Houles</h2>
          <p className="text-xs text-slate-500">Suivi quotidien de l'état de la mer : <span className="font-semibold text-sky-700">{selectedLocality.name}</span></p>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Rechercher une localité côtière..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1.5 border border-slate-300 rounded-md text-sm w-full md:w-64 focus:outline-none focus:border-sky-600"
          />
          <button
            type="submit"
            className="bg-sky-700 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-sky-800 transition-colors"
          >
            Chercher
          </button>
        </form>
      </div>

      {/* Raccourcis de localités rapides */}
      <div className="flex flex-wrap gap-2">
        {LOCALITIES.map((loc) => (
          <button
            key={loc.name}
            onClick={() => setSelectedLocality(loc)}
            className={`px-3 py-1 text-xs rounded-full border transition-all ${
              selectedLocality.name === loc.name
                ? "bg-sky-50 border-sky-600 text-sky-700 font-semibold"
                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {loc.name}
          </button>
        ))}
      </div>

      {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">{error}</div>}

      {/* Tableau des prévisions quotidiennes */}
      {isLoading ? (
        <div className="text-center py-12 text-sm text-slate-500 font-mono animate-pulse">&gt;_ Chargement des données de prédiction marine...</div>
      ) : weather ? (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider">
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Température Max</th>
                <th className="p-3 text-center">Vitesse du Vent</th>
                <th className="p-3 text-center">Hauteur Vagues (Max)</th>
                <th className="p-3 text-center">Période Houle</th>
                <th className="p-3 text-center">Direction dominant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {weather.time.map((dateStr, index) => (
                <tr key={dateStr} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-medium text-slate-900">
                    {new Date(dateStr).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })}
                  </td>
                  <td className="p-3 text-center text-amber-700 font-semibold">{weather.temperature[index]} °C</td>
                  <td className="p-3 text-center text-blue-700 font-mono">{weather.windSpeed[index]} km/h</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-xs ${
                      weather.waveHeight[index] > 2 
                        ? "bg-red-100 text-red-800" 
                        : weather.waveHeight[index] > 1 
                        ? "bg-amber-100 text-amber-800" 
                        : "bg-green-100 text-green-800"
                    }`}>
                      {weather.waveHeight[index]} m
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono">{weather.wavePeriod[index]} sec</td>
                  <td className="p-3 text-center text-slate-500 font-mono">{weather.waveDirection[index]}°</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}