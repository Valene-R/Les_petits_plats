import { getRecipes } from '../services/api.js';
import { normalizeForSearch } from './normalizeString.js';
import { filterListItems } from './filterListItems.js';

/**
 * Recherche principale parmi les recettes en filtrant celles qui correspondent à la requête
 * @param {String} query La chaîne de recherche saisie par l'utilisateur
 * @param {Boolean} [strictSearch=false] Indique si la recherche doit être stricte (correspondance exacte)
 * @returns {Promise<Array>} Un tableau de recettes correspondant à la recherche
 */

export async function mainRecipeSearch(query, strictSearch = false) {
  // Récupère toutes les recettes de manière asynchrone
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

  return recipesFound;
}
