import { recipeCard } from './recipeCard.js';
import { displayError } from '../utils/displayError.js';

/**
 * Affiche les cartes de recette dans le conteneur principal
 * @param {HTMLElement} recipesContainer Le conteneur où les cartes de recette seront affichées
 * @param {Array} recipes Le tableau des recettes à afficher
 * @param {String} query La chaîne de recherche utilisée
 */
export async function displayRecipeCards(recipesContainer, recipes = [], query = '') {
  // Vide le conteneur principal de manière sécurisée en supprimant tous ses enfants, un par un
  // Garantit qu'aucune carte de recette précédente (obsolète) ou en double n'est affichée
  while (recipesContainer.firstChild) {
    recipesContainer.removeChild(recipesContainer.firstChild);
  }

  // Si aucune recette n'est trouvée et qu'une requête de recherche a été utilisée, affiche un message d'erreur
  if (recipes.length === 0 && query.length >= 3) {
    const errorMessage = `Aucune recette ne contient "${query}". Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
    displayError(recipesContainer, errorMessage);
    return;
  }

  // Pour chaque recette, crée et ajoute une carte au conteneur principal
  recipes.forEach((recipe) => {
    const card = recipeCard(recipe);
    recipesContainer.appendChild(card);
  });
}
