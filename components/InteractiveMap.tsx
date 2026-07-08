"use client";

import { MapContainer, TileLayer, Polygon, useMapEvents } from "react-leaflet";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

function MapDrawingTools({ 
  setPoints 
}: { 
  setPoints: React.Dispatch<React.SetStateAction<[number, number][]>> 
}) {
  useMapEvents({
    click(e) {
      setPoints((prev) => [...prev, [e.latlng.lat, e.latlng.lng]]);
    },
  });
  return null;
}

export default function InteractiveMap() {
  const router = useRouter();
  const [drawnPoints, setDrawnPoints] = useState<[number, number][]>([]);
  const defaultPosition: [number, number] = [14.76, -17.22]; 

  const handleClear = () => {
    setDrawnPoints([]);
  };

  const handleAnalyzeRedirect = () => {
    if (drawnPoints.length < 3) return;

    // Convertit en [Lng, Lat] pour le standard spatial de DE Africa
    const structuredCoords = drawnPoints.map((pt) => [pt[1], pt[0]]);
    structuredCoords.push(structuredCoords[0]); // Ferme la géométrie

    const coordsString = encodeURIComponent(JSON.stringify(structuredCoords));
    router.push(`/remote-sensing?poly=${coordsString}`);
  };

  return (
    <div className="w-full h-[550px] rounded-xl overflow-hidden shadow-inner border border-slate-200 relative">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[400] bg-slate-900/90 backdrop-blur text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md text-center min-w-[300px]">
        {drawnPoints.length === 0 && "🖱️ Cliquez sur la carte pour dessiner votre polygone"}
        {drawnPoints.length >= 3 && `✅ Surface définie (${drawnPoints.length} sommets)`}
      </div>

      <MapContainer center={defaultPosition} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapDrawingTools setPoints={setDrawnPoints} />
        {drawnPoints.length > 0 && (
          <Polygon positions={drawnPoints} pathOptions={{ color: "#0369a1", fillColor: "#0ea5e9", fillOpacity: 0.3, weight: 3 }} />
        )}
      </MapContainer>

      {drawnPoints.length >= 3 && (
        <div className="absolute bottom-5 right-5 z-[400] bg-white/95 backdrop-blur p-4 rounded-xl shadow-xl border border-slate-200 w-64 space-y-3">
          <h4 className="text-xs font-bold text-slate-800">Zone d'Étude Prête</h4>
          <div className="flex gap-2">
            <button type="button" onClick={handleClear} className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-md text-xs font-medium hover:bg-slate-200">Effacer</button>
            <button type="button" onClick={handleAnalyzeRedirect} className="flex-[2] bg-sky-700 text-white py-2 rounded-md text-xs font-bold hover:bg-sky-800 shadow-md">Analyser la zone →</button>
          </div>
        </div>
      )}
    </div>
  );
}