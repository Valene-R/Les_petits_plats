import { getUniqueRecipeComponents } from '../services/api.js';
import { createDropdownItems } from './createDropdownItems.js';
import { createDropdown } from './createDropdown.js';
import { displayError } from '../utils/displayError.js';

/**
 * Récupère les ingrédients, appareils et ustensiles uniques, puis affiche les éléments dans les dropdowns
 * @param {HTMLElement} listContainer Le conteneur principal où les dropdowns seront ajoutés
 */
export async function displayDropdownItems(listContainer) {
  try {
    // Récupère les ingrédients, appareils et ustensiles via api.js
    const { ingredients, appliances, ustensils } = await getUniqueRecipeComponents();

    // Crée les dropdowns pour chaque catégorie de listes
    const ingredientsDropdown = createDropdown('Ingrédients', 'ingredients');
    const appliancesDropdown = createDropdown('Appareils', 'appliances');
    const ustensilsDropdown = createDropdown('Ustensiles', 'ustensils');

    // Ajoute les dropdowns au conteneur de la liste d'éléments
    listContainer.appendChild(ingredientsDropdown);
    listContainer.appendChild(appliancesDropdown);
    listContainer.appendChild(ustensilsDropdown);

    // Affiche les éléments dans les dropdowns respectifs
    createDropdownItems(ingredients, document.getElementById('ingredients-content').querySelector('ul'));
    createDropdownItems(appliances, document.getElementById('appliances-content').querySelector('ul'));
    createDropdownItems(ustensils, document.getElementById('ustensils-content').querySelector('ul'));
  } catch (error) {
    // Affiche une erreur en cas de problème lors du chargement des éléments
    console.error('Error loading items:', error);
    displayError(listContainer, 'Échec du chargement des éléments. Veuillez réessayer plus tard.');
  }
}
