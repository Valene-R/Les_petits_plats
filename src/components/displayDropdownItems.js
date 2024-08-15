import { getUniqueRecipeComponents } from '../services/api.js';
import { fillDropdownList } from '../utils/fillDropdownList.js';
import { displayError } from '../utils/displayError.js';

/**
 * Récupère les ingrédients, appareils et ustensiles uniques, puis affiche les éléments dans les dropdowns
 * @param {HTMLElement} listContainer Le conteneur principal où les dropdowns seront ajoutés
 */
export async function displayDropdownItems(listContainer) {
  try {
    // Récupère les ingrédients, appareils et ustensiles via api.js
    const { ingredients, appliances, ustensils } = await getUniqueRecipeComponents();

    // Remplit les dropdowns pour chaque catégorie de listes
    // Cette fonction prend trois arguments :
    // 1. 'title' : Le titre du dropdown qui sera affiché sur le bouton (ex: 'Ingrédients', 'Appareils', 'Ustensiles')
    // 2. 'containerId' : L'identifiant unique du conteneur du dropdown, utilisé pour lier les éléments à leur dropdown respectif ('ingredients', 'appliances', 'ustensils')
    // 3. 'items' : Le tableau des éléments à afficher dans le dropdown (une liste d'ingrédients, d'appareils ou d'ustensiles)
    const ingredientsDropdown = fillDropdownList('Ingrédients', 'ingredients', ingredients);
    const appliancesDropdown = fillDropdownList('Appareils', 'appliances', appliances);
    const ustensilsDropdown = fillDropdownList('Ustensiles', 'ustensils', ustensils);

    // Ajoute les dropdowns au conteneur de la liste d'éléments
    listContainer.appendChild(ingredientsDropdown);
    listContainer.appendChild(appliancesDropdown);
    listContainer.appendChild(ustensilsDropdown);
  } catch (error) {
    // Affiche une erreur en cas de problème lors du chargement des éléments
    console.error('Error loading items:', error);
    displayError(listContainer, 'Échec du chargement des éléments. Veuillez réessayer plus tard.');
  }
}
