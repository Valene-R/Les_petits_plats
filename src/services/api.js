import { normalizeString } from '../utils/normalizeString.js';

/**
 * Récupére dynamiquement les recettes à partir du fichier data/recipes.js
 * @returns {Promise<Array>} Une promesse qui se résout avec le tableau des recettes
 * @throws {Error} Lance une erreur si l'importation échoue
 */
export async function getRecipes() {
  try {
    // Utilise import() pour charger le module de recettes de manière asynchrone
    const { recipes } = await import('../data/recipes.js');
    return recipes; // Retourne les recettes importées
  } catch (error) {
    // Affiche une erreur en cas d'échec de l'importation
    console.error('Failed to fetch recipes:', error);
    throw error; // Relance l'erreur pour la gestion par la fonction appelante
  }
}

/**
 * Récupère les ingrédients, appareils et ustensiles uniques à partir des recettes fournies
 * @param {Array<Object>} [recipes=null] Un tableau optionnel d'objets recettes. Si non fourni, récupère toutes les recettes disponibles via l'API
 * @returns {Promise<Object>} Une promesse qui se résout avec un objet contenant les ingrédients, appareils et ustensiles uniques
 * @throws {Error} Lance une erreur si l'extraction échoue
 */
export async function getUniqueRecipeComponents(recipes = null) {
  try {
    // Récupère toutes les recettes si aucune n'est fournie
    const allRecipes = recipes || (await getRecipes());

    // Initialise des ensembles pour stocker les ingrédients, appareils et ustensiles uniques
    const ingredients = new Set();
    const appliances = new Set();
    const ustensils = new Set();

    // Parcourt chaque recette pour extraire les composants uniques
    allRecipes.forEach((recipe) => {
      // Normalise et ajoute chaque ingrédient à l'ensemble des ingrédients
      recipe.ingredients.forEach((ing) => ingredients.add(normalizeString(ing.ingredient)));
      // Normalise et ajoute l'appareil à l'ensemble des appareils
      appliances.add(normalizeString(recipe.appliance));
      // Normalise et ajoute chaque ustensile à l'ensemble des ustensiles
      recipe.ustensils.forEach((ust) => ustensils.add(normalizeString(ust)));
    });

    // Retourne un objet contenant les ingrédients, appareils et ustensiles uniques convertis en tableaux
    return {
      ingredients: Array.from(ingredients), // Convertit l'ensemble des ingrédients en tableau
      appliances: Array.from(appliances), // Convertit l'ensemble des appareils en tableau
      ustensils: Array.from(ustensils), // Convertit l'ensemble des ustensiles en tableau
    };
  } catch (error) {
    // Affiche un message d'erreur en cas d'échec
    console.error('Failed to fetch recipe components:', error);
    throw error;
  }
}
