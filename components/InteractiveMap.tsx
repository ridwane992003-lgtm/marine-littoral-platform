"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Correction des icônes par défaut de Leaflet sous Next.js
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function InteractiveMap() {
  // Position centrale par défaut (coordonnées génériques adaptables)
  const defaultPosition: [number, number] = [14.7, -17.4]; 

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-inner border border-slate-200">
      <MapContainer center={defaultPosition} zoom={10} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={defaultPosition} icon={defaultIcon}>
          <Popup>
            Zone d'observation active.<br /> Prête pour intégrer vos indices spectraux.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}