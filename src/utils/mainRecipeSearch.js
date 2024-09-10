import { getRecipes } from '../services/api.js';
import { normalizeForSearch } from './normalizeString.js';
import { filterListItems } from './filterListItems.js';
import { updateAllDropdownsItems } from './updateAllDropdownsItems.js';
import { filterRecipesByTags } from './filterRecipesByTags.js';
import { selectedItems } from './state/selectedItemsState.js';
import { setCurrentRecipes } from './state/currentRecipes.js';
import { setMainSearchPerformed } from './state/mainSearchState.js';
import { getUniqueRecipeComponents } from '../services/api.js';
import { displayRecipeCards } from '../components/displayRecipeCards.js';
import { updateRecipeCount } from './updateRecipeCount.js';
import { filteredDropdownItems } from './state/filteredDropdownItems.js';

/**
 * Recherche principale parmi les recettes en filtrant celles qui correspondent à la requête,
 * met à jour les dropdowns (ingrédients, appareils, ustensiles) selon les recettes filtrées
 * et applique un filtre supplémentaire basé sur les tags sélectionnés
 * @param {String} query La chaîne de recherche saisie par l'utilisateur
 * @param {Boolean} [strictSearch=false] Indique si la recherche doit être stricte (correspondance exacte)
 * @returns {Promise<Array>} Un tableau de recettes correspondant à la recherche
 */

export async function mainRecipeSearch(query, strictSearch = false) {
  // Récupère toutes les recettes à partir de api.js
  const recipes = await getRecipes();

  // Normalise la chaîne de recherche pour assurer une comparaison insensible à la casse et aux accents
  const normalizedQuery = normalizeForSearch(query || '');

  // Filtre les recettes qui correspondent à la recherche
  const recipesFound = recipes.filter((recipe) => {
    // Vérifie que les propriétés existent avant de les normaliser
    const name = recipe.name ? normalizeForSearch(recipe.name) : '';
    const description = recipe.description ? normalizeForSearch(recipe.description) : '';
    const ingredients = recipe.ingredients ? recipe.ingredients.map((ing) => normalizeForSearch(ing.ingredient)) : [];

    // Vérifie si la requête de recherche correspond au titre, à la description ou aux ingrédients
    const nameMatch = filterListItems([name], normalizedQuery, 3, strictSearch);
    const descriptionMatch = filterListItems([description], normalizedQuery, 3, strictSearch);
    const ingredientsMatch = filterListItems(ingredients, normalizedQuery, 3, strictSearch);

    // Retourne true si au moins une des propriétés correspond à la recherche
    return nameMatch.length > 0 || descriptionMatch.length > 0 || ingredientsMatch.length > 0;
  });

  // Sauvegarde les recettes trouvées
  setCurrentRecipes(recipesFound);

  // Indique que la recherche principale a été effectuée
  setMainSearchPerformed(true);

  // Récupére les ingrédients, appareils et ustensiles uniques à partir des recettes trouvées
  const { ingredients, appliances, ustensils } = await getUniqueRecipeComponents(recipesFound);

  // Met à jour les éléments de dropdown avec les items filtrés
  filteredDropdownItems.ingredients = ingredients;
  filteredDropdownItems.appliances = appliances;
  filteredDropdownItems.ustensils = ustensils;

  // Met à jour l'affichage des dropdowns en fonction des recettes trouvées
  const listContainer = document.getElementById('filter-dropdown-section');
  updateAllDropdownsItems(recipesFound, listContainer);

  // Si des tags sont sélectionnés, applique un filtre supplémentaire sur les recettes
  let finalRecipes = recipesFound;
  if (selectedItems.size > 0) {
    finalRecipes = await filterRecipesByTags(selectedItems, recipesFound);
  }

  // Met à jour l'affichage des recettes avec le résultat final (après filtre par tags) et le nombre de recettes
  const recipeCardsContainer = document.getElementById('recipe-cards-container');
  displayRecipeCards(recipeCardsContainer, finalRecipes);
  updateRecipeCount(finalRecipes.length);

  // Retourne les recettes filtrées
  return finalRecipes;
}
