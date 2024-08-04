import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

// Convertit l'URL du fichier en chemin de fichier
// Utilise __dirname et __filename pour s'assurer que la configuration fonctionne correctement, peu importe où le projet est situé
const __filename = fileURLToPath(import.meta.url); // Obtient le chemin absolu du fichier en cours
const __dirname = path.dirname(__filename); // Obtient le répertoire du fichier en cours

export default defineConfig({
  base: './', // Utilise un chemin de base relatif
  root: '.',
  publicDir: 'public', // Spécifie le répertoire des fichiers statiques
  build: {
    outDir: 'dist', // Spécifie le répertoire de sortie pour les fichiers de build
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'), // Utilise __dirname pour définir le chemin d'entrée
      },
      output: {
        // Configuration des chemins de sortie pour différents types de fichiers
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').pop(); // Récupère l'extension du fichier
          if (/png|jpe?g|svg|gif|webp|avif|ico/i.test(extType)) {
            extType = 'images';
          } else if (/css/.test(extType)) {
            extType = 'css';
          } else if (/js/.test(extType)) {
            extType = 'js';
          }
          // Retourne le chemin de sortie avec l'extension et un hash (une chaîne de caractères unique) pour le cache busting
          // Evite que le navigateur utilise une version mise en cache du fichier
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        // Définit les noms des fichiers d'entrée principaux
        entryFileNames: 'assets/js/[name]-[hash].js',
        // Définit les noms des fichiers de chunks (morceaux de code séparés pour un chargement plus rapide)
        chunkFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  server: {
    open: true,
  },
});
