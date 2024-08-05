import { getRecipes } from '../services/api.js';
import { recipeCard } from './recipeCard.js';

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

    // Crée un message d'erreur et l'ajoute au conteneur principal
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Échec du chargement des recettes. Veuillez réessayer plus tard.';
    errorMessage.className = 'text-red-600 m-10 text-center text-lg md:text-xl lg:text-2xl';
    mainContainer.appendChild(errorMessage);
  }
}
