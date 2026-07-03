export default function RemoteSensingPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900">Télédétection</h1>
        <p className="mt-2 text-slate-600">Indices NDVI, NDWI et analyses satellites</p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900">NDVI (Normalized Difference Vegetation Index)</h3>
          <p className="mt-2 text-slate-600">Mesure la santé de la végétation marine et côtière</p>
          <div className="mt-4 h-40 bg-gradient-to-r from-red-900 to-green-900 rounded-lg flex items-center justify-center text-white">
            Visualisation NDVI
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900">NDWI (Normalized Difference Water Index)</h3>
          <p className="mt-2 text-slate-600">Mesure l'humidité et la présence d'eau</p>
          <div className="mt-4 h-40 bg-gradient-to-r from-brown-900 to-blue-900 rounded-lg flex items-center justify-center text-white">
            Visualisation NDWI
          </div>
        </div>
      </div>
    </div>
  );
}
