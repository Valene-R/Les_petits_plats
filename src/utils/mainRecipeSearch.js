import { getRecipes } from '../services/api.js';
import { normalizeForSearch } from './normalizeString.js';
import { filterListItems } from './filterListItems.js';

/**
 * Recherche principale parmi les recettes
 * @param {String} query La chaîne de recherche saisie par l'utilisateur
 * @param {Boolean} [strictSearch=false] Indique si la recherche doit être stricte (correspondance exacte)
 * @returns {Promise<Array>} Un tableau de recettes correspondant à la recherche
 */
export async function mainRecipeSearch(query, strictSearch = false) {
  // Récupère toutes les recettes de manière asynchrone
  const recipes = await getRecipes();

  // Initialise un tableau pour stocker les recettes trouvées
  const recipesFound = [];

  // Normalise la chaîne de recherche pour assurer une comparaison insensible à la casse et aux accents
  const normalizedQuery = normalizeForSearch(query || '');

  // Parcourt toutes les recettes pour trouver des correspondances
  for (let i = 0; i < recipes.length; i++) {
    // Récupère la recette à l'index actuel i du tableau 'recipes'
    const recipe = recipes[i];

    // Vérifie que les propriétés existent avant de les normaliser
    const name = recipe.name ? normalizeForSearch(recipe.name) : '';
    const description = recipe.description ? normalizeForSearch(recipe.description) : '';
    const ingredients = recipe.ingredients ? recipe.ingredients.map((ing) => normalizeForSearch(ing.ingredient)) : [];

    // Vérifie si la requête de recherche correspond au titre, à la description ou aux ingrédients
    const nameMatch = filterListItems([name], normalizedQuery, 3, strictSearch);
    const descriptionMatch = filterListItems([description], normalizedQuery, 3, strictSearch);
    const ingredientsMatch = filterListItems(ingredients, normalizedQuery, 3, strictSearch);

    // Si une correspondance est trouvée, ajoute la recette aux recettes trouvées
    if (nameMatch.length > 0 || descriptionMatch.length > 0 || ingredientsMatch.length > 0) {
      recipesFound.push(recipe);
    }
  }

  return recipesFound;
}
