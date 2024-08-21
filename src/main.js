import { displayRecipeCards } from './components/displayRecipeCards.js';
import { displayDropdownItems } from './components/displayDropdownItems.js';
import { updateRecipeCount } from './utils/updateRecipeCount.js';

/**
 * InItialise l'application en affichant les dropdowns de filtrage et les cartes de recette
 */
async function init() {
  const filterDropdownSection = document.getElementById('filter-dropdown-section');
  const recipeCardsContainer = document.getElementById('recipe-cards-container');

  // Affiche les dropdowns de filtrage dans le conteneur
  displayDropdownItems(filterDropdownSection);

  // Affiche les cartes de recette dans le conteneur
  await displayRecipeCards(recipeCardsContainer);

  // Met à jour le nombre total de recettes affichées une fois le chargement des cartes terminé
  updateRecipeCount();
}

init();
