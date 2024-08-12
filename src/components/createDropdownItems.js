import { createDropdownItem } from './createDropdownItem.js';

/**
 * Crée et ajoute les éléments de sélection de la liste dans les dropdowns respectifs
 * @param {Array} items La liste des items (ingrédients, appareils, ustensiles) à afficher dans le dropdown
 * @param {HTMLElement} dropdownContainer Le conteneur HTML (<ul>) où les éléments seront affichés
 * @param {String} containerId L'identifiant unique du conteneur du dropdown. Utilisé pour associer les éléments à leur conteneur d'origine
 */
export function createDropdownItems(items, dropdownContainer, containerId) {
  // Vide le conteneur avant d'ajouter les nouveaux éléments pour éviter les doublons et mettre à jour l'affichage
  dropdownContainer.textContent = '';

  // Pour chaque item de la liste, crée un élément <li> et l'ajoute au conteneur
  items.forEach((item, index) => {
    // Crée un élément de dropdown pour chaque item avec son index et l'ID du conteneur
    const dropdownItem = createDropdownItem(item, index, containerId);
    // Ajoute l'élément de liste <li> au conteneur (<ul>)
    dropdownContainer.appendChild(dropdownItem);
  });
}
