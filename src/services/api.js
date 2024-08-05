/**
 * Récupére dynamiquement les recettes à partir du fichier data/recipes.js
 * @returns {Promise<Array>} Une promesse qui se résout avec le tableau des recettes
 * @throws {Error} Lance une erreur si l'importation échoue
 */
export async function getRecipes() {
  try {
    // Utilise import() pour charger le module de recettes de manière asynchrone
    const { recipes } = await import('../data/recipes.js');
    return recipes; // Retourne les recettes importées
  } catch (error) {
    // Affiche une erreur en cas d'échec de l'importation
    console.error('Failed to fetch recipes:', error);
    throw error; // Relance l'erreur pour la gestion par la fonction appelante
  }
}
