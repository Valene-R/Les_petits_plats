import { getRecipes } from '../services/api';
import { updateFilteredDropdownItems } from './state/filteredDropdownItems';
import { updateAllDropdownsItems } from './updateAllDropdownsItems';
import { displayRecipeCards } from '../components/displayRecipeCards';
import { updateRecipeCount } from './updateRecipeCount';
import { selectedItems } from './state/selectedItemsState';
import { setCurrentRecipes } from './state/currentRecipes';

/**
 * Réinitialise les champs de recherche dans tous les dropdowns
 */
export function resetSearchInputs() {
  const searchInputs = document.querySelectorAll('.search-input');
  const clearButtons = document.querySelectorAll('.clear-button');

  // Réinitialise chaque champ de recherche en vidant son contenu
  searchInputs.forEach((input) => {
    input.value = ''; // Vide les champs de recherche
  });

  // Masque les boutons de suppression de chaque champ de recherche
  clearButtons.forEach((button) => {
    button.classList.add('hidden'); // Cache les boutons de suppression
  });
}

/**
 * Réinitialise les éléments sélectionnés et tags ajoutés
 */
export function resetSelectedItems() {
  selectedItems.clear(); // Vide les éléments sélectionnés
  document.getElementById('tags-container').textContent = ''; // Vide les tags affichés
}

/**
 * Réinitialise les dropdowns, recharge les éléments avec toutes les recettes disponibles depuis l'API
 * et met à jour l'interface
 * @returns {Promise<void>} Une promesse qui se résout une fois les dropdowns mis à jour
 */
export async function resetDropdowns() {
  const dropdownSection = document.getElementById('filter-dropdown-section');

  if (!dropdownSection) {
    console.error('filter-dropdown-section element not found.');
    return;
  }

  const allRecipes = await getRecipes();
  await updateFilteredDropdownItems(allRecipes); // Met à jour les items des dropdowns
  await updateAllDropdownsItems(allRecipes, dropdownSection); // Actualise les dropdowns avec les items mis à jour
}

/**
 * Réinitialise les cartes de recette affichées
 */
export async function resetRecipeCards() {
  const allRecipes = await getRecipes();
  const recipeCardsContainer = document.getElementById('recipe-cards-container');
  displayRecipeCards(recipeCardsContainer, allRecipes); // Affiche toutes les recettes
  updateRecipeCount(allRecipes.length); // Met à jour le nombre de recettes
}

/**
 * Réinitialise globalement l'application
 * Réinitialise les recettes affichées, les dropdowns, les champs de saisie et les éléments sélectionnés
 * @returns {Promise<void>} Une promesse qui se résout une fois que tout a été réinitialisé
 */
export async function resetAll() {
  const allRecipes = await getRecipes(); // Récupère toutes les recettes

  setCurrentRecipes(allRecipes); // Met à jour l'état global des recettes

  resetSearchInputs(); // Réinitialise les champs de recherche
  resetSelectedItems(); // Réinitialise les éléments sélectionnés
  await resetDropdowns(); // Réinitialise les dropdowns
  await resetRecipeCards(); // Réinitialise les recettes affichées
}
