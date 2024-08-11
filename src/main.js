import { displayRecipeCards } from './components/displayRecipeCards.js';
import { displayDropdownItems } from './components/displayDropdownItems.js';

/**
 * InItialise en affichant les cartes de recette et les dropdowns de filtrage
 */
function init() {
  const filterDropdownSection = document.getElementById('filter-dropdown-section');
  const recipeCardsContainer = document.getElementById('recipe-cards-container');

  // Affiche les éléments du dropdown
  displayDropdownItems(filterDropdownSection);

  // Affiche les cartes de recette
  displayRecipeCards(recipeCardsContainer);
}

init();
