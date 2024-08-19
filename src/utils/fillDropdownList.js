import { createDropdownItems } from '../components/createDropdownItems.js';
import { createDropdown } from '../components/createDropdown.js';
import { selectedItems } from './state/selectedItemsState.js';

/**
 * Remplit la liste d'un dropdown spécifique
 * @param {String} title Le titre du dropdown (ex: 'Ingrédients')
 * @param {String} containerId L'identifiant unique du conteneur du dropdown (ex: 'ingredients')
 * @param {Array} items Le tableau d'éléments à afficher dans le dropdown
 * @returns {HTMLElement} Le dropdown complété et prêt à être ajouté au DOM
 */
export function fillDropdownList(title, containerId, items) {
  // Pour diagnostiquer de potentielles erreurs
  // Vérifie que 'items' est bien défini et qu'il s'agit d'un tableau
  if (!items || !Array.isArray(items)) {
    console.error(`Items should be an array and must be defined for ${title}.`);
    return document.createElement('div'); // Retourne un élément vide au lieu de null
  }

  // Crée le dropdown en utilisant le titre et l'identifiant fournis
  const dropdown = createDropdown(title, containerId, items);

  // Récupère le conteneur <ul> où les éléments du dropdown seront insérés
  const dropdownContainer = dropdown.querySelector('ul');

  // Vérifie si le conteneur <ul> a été correctement trouvé
  if (dropdownContainer) {
    // Remplit le conteneur avec les éléments du tableau 'items'
    createDropdownItems(items, dropdownContainer, containerId, selectedItems);
  } else {
    console.error(`Dropdown container with ID ${containerId}-content not found.`);
  }

  return dropdown;
}
