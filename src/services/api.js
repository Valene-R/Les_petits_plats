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
 * Récupère les recettes et extrait les ingrédients, appareils et ustensiles uniques
 * @returns {Promise<Object>} Une promesse qui se résout avec un objet contenant les ingrédients, appareils et ustensiles uniques
 * @throws {Error} Lance une erreur si l'extraction échoue
 */
export async function getUniqueRecipeComponents() {
  try {
    // Appelle la fonction getRecipes pour récupérer toutes les recettes
    const recipes = await getRecipes();

    // Initialise des ensembles pour stocker les ingrédients, appareils et ustensiles uniques
    const ingredients = new Set();
    const appliances = new Set();
    const ustensils = new Set();

    // Parcourt chaque recette pour extraire les composants uniques
    recipes.forEach((recipe) => {
      // Ajoute chaque ingrédient à l'ensemble des ingrédients
      recipe.ingredients.forEach((ing) => ingredients.add(normalizeString(ing.ingredient)));
      // Ajoute l'appareil à l'ensemble des appareils
      appliances.add(normalizeString(recipe.appliance));
      // Ajoute chaque ustensile à l'ensemble des ustensiles
      recipe.ustensils.forEach((ust) => ustensils.add(normalizeString(ust)));
    });

    // Retourne un objet contenant les ingrédients, appareils et ustensiles uniques
    return {
      ingredients: Array.from(ingredients), // Convertit l'ensemble des ingrédients en tableau
      appliances: Array.from(appliances), // Convertit l'ensemble des appareils en tableau
      ustensils: Array.from(ustensils), // Convertit l'ensemble des ustensiles en tableau
    };
  } catch (error) {
    // Affiche un message d'erreur en cas de problème lors de l'extraction des composants
    console.error('Failed to fetch recipe components:', error);
    throw error;
  }
}
