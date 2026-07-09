# Configuration pour exécuter le script sans interface graphique
options(echo = FALSE)
args <- commandArgs(trailingOnly = TRUE)

# Vérification des arguments (Reçoit l'URL du fichier TIF)
if (length(args) == 0) {
  stop("Erreur : Aucun lien de fichier GeoTIFF fourni.")
}

library(terra)
library(ggplot2)
library(tidyterra)

url_tif <- args[1]
output_png <- "public/output_render.png"

tryCatch({
  # 1. Lecture directe depuis l'URL AWS
  raster_data <- rast(url_tif)
  
  # 2. Application de la correction d'échelle si c'est un NDVI
  if (nlyr(raster_data) == 1) {
    if (maxmax(raster_data) > 1) {
      raster_data <- raster_data / 10000
    }
    
    # 3. Génération de la carte thématique
    p <- ggplot() +
      geom_spatraster(data = raster_data) +
      scale_fill_gradientn(
        colors = c("#bebebe", "#ffffe5", "#74c476", "#005a32"),
        limits = c(-0.1, 0.9),
        na.value = "transparent"
      ) +
      theme_void() + # Supprime les axes pour une intégration propre sur le web
      theme(legend.position = "none")
    
    # 4. Sauvegarde de l'image de rendu
    ggsave(output_png, plot = p, width = 6, height = 6, dpi = 150, bg = "transparent")
    cat("SUCCESS")
  } else {
    # Option pour les images RGB
    png(output_png, width = 600, height = 600, bg = "transparent")
    plotRGB(raster_data, r = 1, g = 2, b = 3, stretch = "lin", axes = FALSE)
    dev.off()
    cat("SUCCESS")
  }
}, error = function(e) {
  cat(paste("ERROR:", e$message))
})