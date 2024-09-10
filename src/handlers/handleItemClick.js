import { selectedItems } from '../utils/state/selectedItemsState.js';
import { addTag } from '../utils/addTag.js';
import { removeTagAndItem } from '../utils/removeTagAndItem.js';
import { filterRecipesByTags } from '../utils/filterRecipesByTags.js';

/**
 * Gère le clic sur un élément de la liste pour l'ajouter en tant qu'élément sélectionné,
 * affiché en tête de liste avec une croix de suppression et un tag associé
 * @param {HTMLElement} listItem L'élément de liste sélectionné
 * @param {String} text Le texte de l'item sélectionné
 * @param {String} containerId L'identifiant du conteneur parent (ingrédients, appareils, ustensiles)
 */
export function handleItemClick(listItem, text, containerId) {
  // Crée une clé unique pour identifier l'élément sélectionné (containerId:item)
  const itemKey = `${containerId}:${text}`;

  // Vérifie que selectedItems est bien une instance de Map
  if (!selectedItems || !(selectedItems instanceof Map)) {
    console.error('selectedItems is undefined, null, or not a Map.');
    return;
  }

  // Vérifie si l'item est déjà sélectionné (croix de suppression déjà présente)
  if (listItem.querySelector('.remove-btn')) {
    return; // Ne rien faire si l'item est déjà sélectionné
  }

  // Déplace l'item sélectionné en tête de liste
  const dropdownListContainer = listItem.parentNode; // Accède au conteneur parent de listItem
  dropdownListContainer.prepend(listItem); // Insère listItem comme le premier enfant de dropdownListContainer

  // Applique les styles de l'élément sélectionné, y compris la croix de suppression
  applySelectedItemStyles(listItem, text, containerId);

  // Enregistre l'élément dans la Map selectedItems pour suivre l'état des sélections
  selectedItems.set(itemKey, true); // Utilise la clé unique pour stocker l'état

  // Ajoute un tag associé à l'item sélectionné en dessous des dropdowns
  addTag(text, containerId, selectedItems);

  // Filtre les recettes en fonction des éléments sélectionnés et met à jour l'affichage
  filterRecipesByTags(selectedItems).then(() => {
    // Après le filtrage, réapplique la logique d'affichage pour les éléments sélectionnés
    reapplySelectedItems();
  });
}

/**
 * Réapplique les éléments sélectionnés en tête de liste après le filtrage.
 */
export function reapplySelectedItems() {
  selectedItems.forEach((_, itemKey) => {
    const [keyContainerId, itemText] = itemKey.split(':');
    // Récupère le conteneur du dropdown associé
    const dropdownListContainer = document.getElementById(`${keyContainerId}-content`).querySelector('ul');

    // Trouve l'élément correspondant dans le dropdown
    const selectedListItem = Array.from(dropdownListContainer.children).find(
      (li) => li.textContent.trim() === itemText.trim(),
    );

    if (selectedListItem) {
      // Déplace l'élément en tête de liste
      dropdownListContainer.prepend(selectedListItem);
      // Réapplique le style et la croix de suppression
      applySelectedItemStyles(selectedListItem, itemText, keyContainerId);
    }
  });
}

/**
 * Applique les styles de sélection à un élément de liste et ajoute un bouton de suppression
 * @param {HTMLElement} listItem L'élément de liste sélectionné
 * @param {String} text Le texte de l'item sélectionné
 * @param {String} containerId L'identifiant du conteneur parent
 */
function applySelectedItemStyles(listItem, text, containerId) {
  // Applique le style pour indiquer que l'élément est sélectionné
  listItem.classList.add('bg-customYellow', 'text-black', 'font-bold', 'selected-item', 'font-h3');
  listItem.classList.remove('hover:bg-customYellow', 'cursor-pointer', 'font-li');

  // Vérifie si l'élément a déjà une croix de suppression pour éviter d'en créer plusieurs
  if (!listItem.querySelector('.remove-btn')) {
    // Crée un bouton pour supprimer l'élément (croix)
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-btn cursor-pointer';

    // Utilise createElement et setAttribute pour éviter l'injection de HTML
    // Crée l'élément SVG pour la croix de suppression
    const svgCross = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgCross.setAttribute('width', '17');
    svgCross.setAttribute('height', '17');
    svgCross.setAttribute('viewBox', '0 0 17 17');
    svgCross.setAttribute('fill', 'none');

    // Crée l'élément cercle pour le fond de la croix
    const circleCross = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circleCross.setAttribute('cx', '8.5');
    circleCross.setAttribute('cy', '8.5');
    circleCross.setAttribute('r', '8.5');
    circleCross.setAttribute('fill', 'black');

    // Crée l'élément path pour la croix
    const pathCross = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathCross.setAttribute('d', 'M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11');
    pathCross.setAttribute('stroke', '#FFD15B');
    pathCross.setAttribute('stroke-linecap', 'round');
    pathCross.setAttribute('stroke-linejoin', 'round');

    // Assemble les éléments SVG
    svgCross.appendChild(circleCross);
    svgCross.appendChild(pathCross);
    removeButton.appendChild(svgCross);

    // Ajoute un écouteur d'événement pour gérer la suppression de l'item et du tag
    removeButton.addEventListener('click', (e) => {
      const itemKey = `${containerId}:${text}`;
      e.stopPropagation(); // Empêche le clic de déclencher handleItemClick() à nouveau

      // Supprime à la fois l'item du dropdown et le tag associé
      removeTagAndItem(text, containerId, selectedItems);

      // Vérifie si l'élément est présent dans selectedItems avant de le supprimer
      if (selectedItems.has(itemKey)) {
        selectedItems.delete(itemKey); // Supprime l'élément de la Map selectedItems
      }

      // Met à jour les recettes après la suppression
      filterRecipesByTags(selectedItems).then(() => {
        // Réapplique les éléments sélectionnés
        reapplySelectedItems();
      });
    });

    // Ajoute le bouton de suppression (croix) à l'item de liste
    listItem.appendChild(removeButton);
  }
}
