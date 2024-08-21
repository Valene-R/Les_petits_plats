/**
 * Gère l'affichage du nombre de recettes
 * @param {number} recipeCount Le nombre de recettes à afficher
 */
export function displayRecipeCount(recipeCount) {
  // Sélectionne l'élément où le nombre de recettes sera affiché
  const recipeCountElement = document.getElementById('recipe-count');

  // Met à jour le texte du compteur en fonction du nombre de recettes trouvées
  if (recipeCount === 0 || recipeCount === 1) {
    recipeCountElement.textContent = `${recipeCount} recette`;
  } else {
    recipeCountElement.textContent = `${recipeCount} recettes`;
  }
}
