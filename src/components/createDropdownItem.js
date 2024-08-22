import { initialOrder } from '../utils/state/initialOrderState.js';
import { handleItemClick } from '../handlers/handleItemClick.js';

/**
 * Crée un élément de liste pour le dropdown
 * @param {String} text Le texte de l'élément
 * @param {Number} [index=null] L'indice de l'item dans la liste originale. Utilisé pour enregistrer l'ordre initial
 * @param {String} containerId L'identifiant du conteneur associé
 * @param {Boolean} [isSelected=false] Indique si l'élément est sélectionné. Par défaut, il ne l'est pas
 * @returns {HTMLElement} L'élément HTML <li> représentant l'item du dropdown
 */
export function createDropdownItem(text, index = null, containerId, isSelected = false) {
  const listItem = document.createElement('li');
  listItem.className = 'block pl-4 py-2 text-sm text-black hover:bg-customYellow font-li cursor-pointer';
  listItem.textContent = text;
  listItem.setAttribute('role', 'option');
  listItem.setAttribute('data-container-id', containerId); // Stocke l'identifiant du conteneur d'origine

  // Si un index est fourni et si l'ordre n'a pas encore été enregistré
  if (index !== null && !initialOrder.has(`${text}-${containerId}`)) {
    // Enregistre la position initiale de l'élément dans le dropdown
    initialOrder.set(`${text}-${containerId}`, index);
  }

  // Applique les classes CSS selon l'état de sélection de l'élément
  if (isSelected) {
    listItem.classList.add('bg-customYellow', 'text-black', 'font-bold', 'selected-item');
    listItem.classList.remove('hover:bg-customYellow', 'cursor-pointer', 'font-li');
  } else {
    // Ajoute un événement 'click' pour la sélection de l'item
    listItem.addEventListener('click', (e) => {
      e.stopPropagation(); // Empêche l'événement de clic de se propager à d'autres éléments

      // Vérifie si l'élément n'est pas déjà sélectionné
      if (!listItem.classList.contains('selected-item')) {
        // Appelle handleItemClick pour mettre à jour l'état de l'élément, son affichage, et sa gestion dans selectedItems
        handleItemClick(listItem, text, containerId);
      }
    });
  }

  return listItem;
}
