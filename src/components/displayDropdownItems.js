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
    // Cette fonction prend trois arguments :
    // 1. Le tableau d'éléments à afficher dans le dropdown ('ingredients', 'appliances', 'ustensils')
    // 2. Le conteneur <ul> du dropdown où les éléments seront ajoutés
    // 3. Un identifiant unique ('ingredients', 'appliances', 'ustensils')
    // qui aide à lier chaque dropdown à son contenu pour des opérations comme la réinitialisation de l'ordre des éléments aprés suppressions ou réinsertions
    createDropdownItems(ingredients, document.getElementById('ingredients-content').querySelector('ul'), 'ingredients');
    createDropdownItems(appliances, document.getElementById('appliances-content').querySelector('ul'), 'appliances');
    createDropdownItems(ustensils, document.getElementById('ustensils-content').querySelector('ul'), 'ustensils');
  } catch (error) {
    // Affiche une erreur en cas de problème lors du chargement des éléments
    console.error('Error loading items:', error);
    displayError(listContainer, 'Échec du chargement des éléments. Veuillez réessayer plus tard.');
  }
}
