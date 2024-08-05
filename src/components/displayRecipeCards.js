import { getRecipes } from '../services/api.js';
import { recipeCard } from './recipeCard.js';
import { displayError } from '../utils/displayError.js';

/**
 *  Affiche les cartes de recette dans le conteneur principal
 */
export async function displayRecipeCards() {
  const mainContainer = document.querySelector('main');

  // Vide le conteneur principal de manière sécurisée en supprimant tous ses enfants, un par un
  // Garantit qu'aucune carte de recette précédente (obsolète) ou en double n'est affichée
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }

  try {
    // Récupére les recettes dynamiquement
    const recipes = await getRecipes();
    // Pour chaque recette, crée et ajoute une carte au conteneur principal
    recipes.forEach((recipe) => {
      const card = recipeCard(recipe);
      mainContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading recipe cards:', error);

    // Utilise la fonction displayError pour afficher un message d'erreur
    displayError(mainContainer, 'Échec du chargement des recettes. Veuillez réessayer plus tard.');
  }
}
