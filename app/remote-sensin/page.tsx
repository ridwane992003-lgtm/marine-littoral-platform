export default function RemoteSensingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-marine">Télédétection</h1>
        <p className="mt-2 text-slate-600">
          Visualisation des indices et préparation des traitements raster.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-semibold">NDVI</h2>
          <p className="mt-3 text-slate-600">
            Module prévu pour analyser la végétation littorale à partir
            d'images Sentinel-2 ou Landsat.
          </p>
          <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
            Formule : (NIR - Red) / (NIR + Red)
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold">NDWI</h2>
          <p className="mt-3 text-slate-600">
            Module prévu pour la détection de l'eau de surface et le suivi
            des mares ou zones humides.
          </p>
          <div className="mt-4 rounded-xl bg-cyan-50 p-4 text-sm text-cyan-900">
            Formule : (Green - NIR) / (Green + NIR)
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold">Pipeline scientifique prévu</h2>
        <ol className="mt-4 list-decimal pl-6 space-y-2 text-slate-700">
          <li>Import d'images satellite</li>
          <li>Correction et préparation</li>
          <li>Calcul des indices</li>
          <li>Extraction par zone d'étude</li>
          <li>Stockage des rasters et statistiques</li>
        </ol>
      </div>
    </div>
  );
}
