import { getUniqueRecipeComponents } from '../services/api.js';
import { displayError } from './displayError.js';
import { createDropdownItems } from '../components/createDropdownItems.js';

/**
 * Met à jour les dropdowns (ingrédients, appareils, ustensiles) en fonction des recettes filtrées
 * @param {Array} filteredRecipes La liste des recettes filtrées
 * @param {HTMLElement} listContainer Le conteneur principal où les dropdowns sont ajoutés
 */
export async function updateAllDropdownsItems(filteredRecipes, listContainer) {
  try {
    // Récupère les ingrédients, appareils et ustensiles uniques à partir des recettes filtrées
    const { ingredients, appliances, ustensils } = await getUniqueRecipeComponents(filteredRecipes);

    // Sélectionne les dropdowns existants dans le DOM
    const ingredientsDropdown = document.querySelector('#ingredients-content ul');
    const appliancesDropdown = document.querySelector('#appliances-content ul');
    const ustensilsDropdown = document.querySelector('#ustensils-content ul');

    // Vérifie que les dropdowns existent avant de les manipuler
    if (!ingredientsDropdown || !appliancesDropdown || !ustensilsDropdown) {
      console.error('Dropdown elements not found.');
      return;
    }

    // Supprime uniquement les items à l'intérieur des dropdowns sans recréer le conteneur principal
    ingredientsDropdown.textContent = '';
    appliancesDropdown.textContent = '';
    ustensilsDropdown.textContent = '';

    // Ajoute les nouveaux items dans chaque dropdown sans recréer la structure du dropdown
    createDropdownItems(ingredients, ingredientsDropdown, 'ingredients');
    createDropdownItems(appliances, appliancesDropdown, 'appliances');
    createDropdownItems(ustensils, ustensilsDropdown, 'ustensils');
  } catch (error) {
    console.error('Error updating dropdown items:', error);
    // Affiche un message d'erreur dans l'interface utilisateur en cas de problème
    displayError(listContainer, 'Échec de la mise à jour des éléments. Veuillez réessayer plus tard.');
  }
}
