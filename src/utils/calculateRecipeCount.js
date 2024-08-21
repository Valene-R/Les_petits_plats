/**
 * Calcule le nombre de recettes actuellement affichées
 * @returns {number} Le nombre de recettes affichées
 */
export function calculateRecipeCount() {
  // Sélectionne toutes les cartes de recette affichées dans le conteneur
  const recipeCards = document.querySelectorAll('#recipe-cards-container .recipe-card');

  return recipeCards.length;
}
