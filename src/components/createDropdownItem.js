import { initialOrder } from '../utils/state/initialOrderState.js';
import { handleItemClick } from '../handlers/handleItemClick.js';

/**
 * Crée un élément HTML pour un item de sélection du dropdown
 * @param {String} text Le texte de l'item de sélection
 * @param {Number} index L'indice de l'item dans la liste originale
 * @param {String} containerId L'identifiant du conteneur auquel cet élément appartient
 * @returns {HTMLElement} L'élément HTML de l'item de sélection
 */
export function createDropdownItem(text, index, containerId) {
  const listItem = document.createElement('li');
  listItem.className = 'block pl-4 py-2 text-sm text-black hover:bg-customYellow font-li cursor-pointer';
  listItem.textContent = text;
  listItem.setAttribute('role', 'option');
  listItem.setAttribute('data-container-id', containerId); // Stocke l'identifiant du conteneur d'origine

  // Stocke l'ordre initial des éléments
  // Si l'ordre initial de l'élément n'a pas encore été enregistré
  if (!initialOrder.has(`${text}-${containerId}`)) {
    // Enregistre la position initiale de l'élément dans le dropdown
    initialOrder.set(`${text}-${containerId}`, index);
  }

  // Ajoute un événement 'click' pour la sélection de l'item
  listItem.addEventListener('click', () => {
    // Vérifie si l'élément est déjà sélectionné
    if (!listItem.classList.contains('selected-item')) {
      // Gère la logique de sélection/dé-sélection des éléments et leur gestion dans selectedItems
      handleItemClick(listItem, text, containerId);
    }
  });

  return listItem;
}
