import { displayRecipeCards } from '../components/displayRecipeCards.js';
import { updateRecipeCount } from './updateRecipeCount.js';
import { normalizeString } from './normalizeString.js';
import { displayError } from './displayError.js';
import { updateAllDropdownsItems } from './updateAllDropdownsItems.js';
import { getCurrentRecipes } from './state/currentRecipes.js';
import { getRecipes } from '../services/api.js';
import { updateFilteredDropdownItems } from './state/filteredDropdownItems.js';

/**
 * Filtre les recettes en fonction des tags sélectionnés (ingrédients, appareils, ustensiles)
 * et met à jour les cartes de recettes affichées.
 * @param {Map} selectedItems La collection des éléments sélectionnés sous forme de Map, où la clé est un identifiant d'élément et la valeur est ignorée
 * @param {Array<Object>} [recipes=null] Un tableau optionnel de recettes à filtrer. Si non fourni, la fonction utilise la liste des recettes actuellement sauvegardées via `getCurrentRecipes()`
 * @returns {Promise<Array<Object>>} Retourne un tableau des recettes filtrées. Si aucune recette ne correspond, retourne un tableau vide
 */
export async function filterRecipesByTags(selectedItems, recipes = null) {
  let allRecipes;

  // Si aucune recette n'est passée en paramètre, utilise les recettes affichées actuellement
  if (!recipes) {
    const currentRecipes = getCurrentRecipes();

    // Si des recettes sont déjà affichées, utilise-les
    if (Array.isArray(currentRecipes) && currentRecipes.length > 0) {
      allRecipes = currentRecipes;
    } else {
      // Si aucune recette n'est affichée, récupére toutes les recettes via api.js
      allRecipes = await getRecipes();
    }
  } else {
    allRecipes = recipes;
  }

  // Si aucun tag n'est sélectionné, retourne toutes les recettes
  if (selectedItems.size === 0) {
    displayRecipeCards(document.getElementById('recipe-cards-container'), allRecipes);
    updateRecipeCount(allRecipes.length);
    updateAllDropdownsItems(allRecipes, document.getElementById('filter-dropdown-section'));

    // Appelle updateFilteredDropdownItems pour synchroniser les dropdowns avec toutes les recettes
    await updateFilteredDropdownItems(allRecipes);
    return allRecipes; // Retourne toutes les recettes sans filtrage
  }

  // Crée des tableaux pour stocker les tags par catégorie
  const ingredientsTags = [];
  const appliancesTags = [];
  const ustensilsTags = [];

  // Parcourt les 'selectedItems' pour extraire les tags en fonction de leur containerId
  selectedItems.forEach((_, itemKey) => {
    // Sépare la clé (itemKey) en deux parties : containerId (catégorie de l'élément) et itemText (texte de l'élément)
    const [containerId, itemText] = itemKey.split(':');
    // Vérifie si l'élément appartient à la catégorie "ingrédients"
    if (containerId === 'ingredients') {
      // Ajoute l'élément dans le tableau des ingrédients après l'avoir normalisé
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
      appliancesTags.length === 0 ||
      appliancesTags.every((tag) => normalizeString(recipe.appliance) === normalizeString(tag));

    // Vérifie que tous les ustensiles sélectionnés sont présents dans la recette
    const matchesUstensils =
      ustensilsTags.length === 0 ||
      ustensilsTags.every((tag) => recipe.ustensils.some((ust) => normalizeString(ust) === tag));

    // Retourne uniquement les recettes qui correspondent à tous les critères
    return matchesIngredients && matchesAppliances && matchesUstensils;
  });

  // Met à jour l'interface utilisateur selon le résultat du filtrage
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
  }

  // Met à jour les dropdowns avec les recettes filtrées
  updateAllDropdownsItems(filteredRecipes, document.getElementById('filter-dropdown-section'));

  // Met à jour l'état des items filtrés
  if (filteredRecipes.length > 0) {
    await updateFilteredDropdownItems(filteredRecipes);
  }

  return filteredRecipes;
}
