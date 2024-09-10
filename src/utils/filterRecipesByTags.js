import { displayRecipeCards } from '../components/displayRecipeCards.js';
import { updateRecipeCount } from './updateRecipeCount.js';
import { normalizeString } from './normalizeString.js';
import { displayError } from './displayError.js';
import { updateAllDropdownsItems } from './updateAllDropdownsItems.js';
import { getCurrentRecipes } from './state/currentRecipes.js';

/**
 * Filtre les recettes en fonction des tags sélectionnés (ingrédients, appareils, ustensiles)
 * et met à jour les cartes de recettes affichées.
 * @param {Map} selectedItems La collection des éléments sélectionnés sous forme de Map, où la clé est un identifiant d'élément et la valeur est ignorée
 * @param {Array<Object>} [recipes=null] Un tableau optionnel de recettes à filtrer. Si non fourni, la fonction utilise la liste des recettes actuellement sauvegardées via `getCurrentRecipes()`
 * @returns {Promise<Array<Object>>} Retourne un tableau des recettes filtrées. Si aucune recette ne correspond, retourne un tableau vide
 */
export async function filterRecipesByTags(selectedItems, recipes = null) {
  // Utilise la liste des recettes fournie ou toutes les recettes sauvegardées si aucune liste n'est fournie
  const allRecipes = recipes || getCurrentRecipes(); // Utilise la fonction pour obtenir les recettes actuellement sauvegardées

  // Vérifie s'il y a des recettes à filtrer
  if (!allRecipes || allRecipes.length === 0) {
    return [];
  }

  // Vérifie si allRecipes est bien un tableau
  if (!Array.isArray(allRecipes)) {
    console.error('allRecipes must be an array to use the filter method:', allRecipes);
    return [];
  }

  // Crée des tableaux pour stocker les tags par catégorie
  const ingredientsTags = [];
  const appliancesTags = [];
  const ustensilsTags = [];

  // Parcourt des 'selectedItems' pour extraire les tags en fonction de leur containerId
  selectedItems.forEach((_, itemKey) => {
    const [containerId, itemText] = itemKey.split(':');
    if (containerId === 'ingredients') {
      ingredientsTags.push(normalizeString(itemText));
    } else if (containerId === 'appliances') {
      appliancesTags.push(normalizeString(itemText));
    } else if (containerId === 'ustensils') {
      ustensilsTags.push(normalizeString(itemText));
    }
  });

  // Filtre les recettes en fonction des tags
  const filteredRecipes = allRecipes.filter((recipe) => {
    // Vérifie que tous les ingrédients sélectionnés sont présents dans la recette
    const matchesIngredients =
      ingredientsTags.length === 0 ||
      ingredientsTags.every((tag) => recipe.ingredients.some((ing) => normalizeString(ing.ingredient) === tag));

    // Vérifie que tous les appareils sélectionnés sont présents dans la recette
    const matchesAppliances =
      appliancesTags.length === 0 || appliancesTags.every((tag) => normalizeString(recipe.appliance) === tag);

    // Vérifie que tous les ustensiles sélectionnés sont présents dans la recette
    const matchesUstensils =
      ustensilsTags.length === 0 ||
      ustensilsTags.every((tag) => recipe.ustensils.some((ust) => normalizeString(ust) === tag));

    // Retourne true uniquement si tous les critères sont respectés
    return matchesIngredients && matchesAppliances && matchesUstensils;
  });

  // Sélectionne le conteneur des cartes de recettes
  const recipeCardsContainer = document.getElementById('recipe-cards-container');

  if (filteredRecipes.length === 0) {
    // Affiche un message d'erreur si aucune recette n'est trouvée
    displayError(recipeCardsContainer, 'Aucune recette ne correspond aux critères sélectionnés.');
    // Met le nombre de recettes à 0
    updateRecipeCount(0);
  } else {
    // Met à jour l'affichage des recettes filtrées
    displayRecipeCards(recipeCardsContainer, filteredRecipes);
    // Met à jour du nombre de recettes affichées
    updateRecipeCount(filteredRecipes.length);
    // Met à jour les dropdowns avec les nouvelles recettes filtrées
    updateAllDropdownsItems(filteredRecipes, document.getElementById('filter-dropdown-section'));
  }

  return filteredRecipes;
}
