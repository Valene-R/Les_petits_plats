import { calculateRecipeCount } from './calculateRecipeCount';
import { displayRecipeCount } from '../components/displayRecipeCount.js';

/**
 * Met à jour l'affichage du nombre de recettes affichées
 */
export function updateRecipeCount() {
  const recipeCount = calculateRecipeCount();

  displayRecipeCount(recipeCount);
}
