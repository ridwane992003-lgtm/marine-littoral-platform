"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Composant interne pour capturer les coordonnées de la vue actuelle
function MapBBoxExporter({ onBBoxChange }: { onBBoxChange: (bbox: string) => void }) {
  const map = useMap();
  
  const handleCapture = () => {
    const bounds = map.getBounds();
    const west = bounds.getWest().toFixed(4);
    const south = bounds.getSouth().toFixed(4);
    const east = bounds.getEast().toFixed(4);
    const north = bounds.getNorth().toFixed(4);
    
    // Format standard : Ouest, Sud, Est, Nord (Bounding Box)
    const bboxString = `${west},${south},${east},${north}`;
    onBBoxChange(bboxString);
  };

  return (
    <div className="absolute bottom-5 left-5 z-[400]">
      <button
        type="button"
        onClick={handleCapture}
        className="bg-sky-700 text-white px-4 py-2 rounded-md font-semibold text-xs shadow-lg hover:bg-sky-800 transition-colors"
      >
        🎯 Sélectionner cette zone pour la Télédétection
      </button>
    </div>
  );
}

export default function InteractiveMap() {
  const router = useRouter();
  const [selectedBBox, setSelectedBBox] = useState("");
  const defaultPosition: [number, number] = [14.76, -17.22]; // Centré par défaut sur la zone Niague / Lac Rose

  const handleAnalyzeRedirect = () => {
    if (selectedBBox) {
      // Redirection automatique vers la page télédétection avec les coordonnées en paramètre URL
      router.push(`/remote-sensing?bbox=${selectedBBox}`);
    }
  };

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-inner border border-slate-200 relative">
      <MapContainer center={defaultPosition} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBBoxExporter onBBoxChange={(bbox) => setSelectedBBox(bbox)} />
      </MapContainer>

      {selectedBBox && (
        <div className="absolute top-5 right-5 z-[400] bg-white/95 backdrop-blur p-3 rounded-lg shadow-md border border-slate-200 max-w-xs animate-fadeIn">
          <p className="text-[11px] font-mono text-slate-600 truncate">BBox détectée : {selectedBBox}</p>
          <button
            onClick={handleAnalyzeRedirect}
            className="mt-2 w-full bg-emerald-600 text-white py-1.5 rounded text-xs font-bold hover:bg-emerald-700 transition-colors"
          >
            Envoyer les coordonnées au traitement →
          </button>
        </div>
      )}
    </div>
  );
}