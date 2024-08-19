import { createDropdownItem } from '../components/createDropdownItem.js';
import { initialOrder } from './state/initialOrderState.js';

/**
 * Réinitialise un élément dans la liste du dropdown à sa position d'origine
 * @param {String} text Le texte de l'élément à réinsérer
 * @param {String} containerId L'identifiant du conteneur parent
 */
export function resetDropdownItem(text, containerId) {
  // Récupère le conteneur du contenu du dropdown via son ID
  const dropdownContent = document.getElementById(`${containerId}-content`);

  // Récupère <ul> dans le conteneur du dropdown
  const dropdownContainer = dropdownContent.querySelector('ul');

  // Trouve l'item sélectionné (l'élément sur fond jaune en tête de liste avec la croix) et le supprime du dropdown s'il existe
  const selectedItem = Array.from(dropdownContainer.children).find(
    (item) => item.textContent.trim() === text.trim() && item.querySelector('.remove-btn'),
  );

  if (selectedItem) {
    selectedItem.remove();
  }

  // Récupère l'index d'origine de l'élément dans la liste initiale
  const originalIndex = initialOrder.get(`${text}-${containerId}`);

  // Crée un nouvel élément de liste pour le dropdown
  // Appelle la fonction `createDropdownItem` pour recréer l'élément de la liste, en utilisant le texte et l'index d'origine
  const newListItem = createDropdownItem(text, originalIndex, containerId);

  // Réinsère l'élément à sa position d'origine dans le dropdown
  // Vérifie si le nombre d'enfants (li) dans le conteneur dropdown est supérieur à l'index d'origine
  if (dropdownContainer.children.length > originalIndex) {
    // Si c'est le cas, insère le nouvel élément à sa position d'origine
    dropdownContainer.insertBefore(newListItem, dropdownContainer.children[originalIndex]);
  } else {
    // Sinon, ajoute le nouvel élément à la fin du conteneur dropdown
    dropdownContainer.appendChild(newListItem);
  }
}
