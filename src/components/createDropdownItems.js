import { createDropdownItem } from './createDropdownItem.js';

/**
 * Crée et ajoute les éléments de sélection de la liste dans les dropdowns respectifs
 * @param {Array} items La liste des items (ingrédients, appareils, ustensiles) à afficher dans le dropdown
 * @param {HTMLElement} dropdownContainer Le conteneur HTML (<ul>) où les éléments seront affichés
 */
export function createDropdownItems(items, dropdownContainer) {
  // Vide le conteneur avant d'ajouter les nouveaux éléments pour éviter les doublons et mettre à jour l'affichage
  dropdownContainer.textContent = '';

  // Pour chaque item de la liste, crée un élément et l'ajoute au conteneur
  items.forEach((item) => {
    const dropdownItem = createDropdownItem(item); // Crée un élément de liste de sélection (li)
    dropdownContainer.appendChild(dropdownItem); // Ajoute l'élément de liste (li) au conteneur (<ul>)
  });
}
