"use client";

export function MapPlaceholder() {
  return (
    <div className="card h-[420px] flex items-center justify-center bg-gradient-to-br from-cyan-50 to-emerald-50">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-marine">Carte interactive</h3>
        <p className="mt-2 max-w-lg text-slate-600">
          Zone réservée à l'intégration Leaflet, couches géospatiales,
          mares, habitats et indices NDVI/NDWI.
        </p>
      </div>
    </div>
  );
}
