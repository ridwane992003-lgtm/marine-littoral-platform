"use client";

import { MapContainer, TileLayer, Polygon, useMapEvents } from "react-leaflet";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

// Composant interne pour gérer les clics et le dessin du polygone
function MapDrawingTools({ 
  points, 
  setPoints 
}: { 
  points: [number, number][]; 
  setPoints: React.Dispatch<React.SetStateAction<[number, number][]>> 
}) {
  useMapEvents({
    click(e) {
      // Ajoute le point cliqué (Latitude, Longitude) à la liste
      setPoints((prev) => [...prev, [e.latlng.lat, e.latlng.lng]]);
    },
  });

  return null;
}

export default function InteractiveMap() {
  const router = useRouter();
  const [drawnPoints, setDrawnPoints] = useState<[number, number][]>([]);
  const defaultPosition: [number, number] = [14.76, -17.22]; // Centré sur le secteur Niague / Lac Rose

  // Réinitialiser le dessin
  const handleClear = () => {
    setDrawnPoints([]);
  };

  // Envoyer la géométrie vers la page de Télédétection
  const handleAnalyzeRedirect = () => {
    if (drawnPoints.length < 3) return;

    // Pour Digital Earth Africa (STAC), on convertit en format standard GeoJSON [Lng, Lat]
    // Et on ferme le polygone en répétant le premier point à la fin
    const structuredCoords = drawnPoints.map((pt) => [pt[1], pt[0]]);
    structuredCoords.push(structuredCoords[0]); // Fermeture de la boucle

    // Transformation en chaîne de caractères sécurisée pour l'URL
    const coordsString = encodeURIComponent(JSON.stringify(structuredCoords));
    
    // Redirection vers la page avec le paramètre de polygone complet
    router.push(`/remote-sensing?poly=${coordsString}`);
  };

  return (
    <div className="w-full h-[550px] rounded-xl overflow-hidden shadow-inner border border-slate-200 relative">
      {/* Barre d'instructions supérieure */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[400] bg-slate-900/90 backdrop-blur text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md pointer-events-none text-center min-w-[300px]">
        {drawnPoints.length === 0 && "🖱️ Cliquez sur la carte pour commencer à dessiner votre polygone"}
        {drawnPoints.length === 1 && "📍 Cliquez pour ajouter le deuxième point"}
        {drawnPoints.length === 2 && "📐 Cliquez pour ajouter un troisième point et former une surface"}
        {drawnPoints.length >= 3 && `✅ Surface définie (${drawnPoints.length} sommets)`}
      </div>

      <MapContainer center={defaultPosition} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Active l'écouteur de clics pour le dessin */}
        <MapDrawingTools points={drawnPoints} setPoints={setDrawnPoints} />

        {/* Affiche le polygone en cours de dessin sur la carte */}
        {drawnPoints.length > 0 && (
          <Polygon 
            positions={drawnPoints} 
            pathOptions={{ 
              color: "#0369a1", 
              fillColor: "#0ea5e9", 
              fillOpacity: 0.3,
              weight: 3 
            }} 
          />
        )}
      </MapContainer>

      {/* Panneau de contrôle flottant à droite */}
      {drawnPoints.length >= 3 && (
        <div className="absolute bottom-5 right-5 z-[400] bg-white/95 backdrop-blur p-4 rounded-xl shadow-xl border border-slate-200 w-64 animate-fadeIn space-y-3">
          <div>
            <h4 className="text-xs font-bold text-slate-800">Zone d'Étude Personnalisée</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Votre polygone est correctement tracé et prêt à être envoyé.</p>
          </div>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-md text-xs font-medium hover:bg-slate-200 transition-colors"
            >
              Effacer
            </button>
            <button
              type="button"
              onClick={handleAnalyzeRedirect}
              className="flex-[2] bg-sky-700 text-white py-2 rounded-md text-xs font-bold hover:bg-sky-800 shadow-md transition-colors text-center"
            >
              Analyser la zone →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}