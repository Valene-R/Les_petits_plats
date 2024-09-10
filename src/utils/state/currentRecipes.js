let currentRecipes = []; // Stocke les recettes trouvées

/**
 * Retourne la liste des recettes actuellement sauvegardées
 * @returns {Array} Le tableau des recettes actuelles
 */
export function getCurrentRecipes() {
  return currentRecipes;
}

/**
 * Met à jour la liste des recettes actuellement sauvegardées
 * @param {Array} recipes Le tableau de nouvelles recettes à sauvegarder
 */
export function setCurrentRecipes(recipes) {
  currentRecipes = recipes;
}
