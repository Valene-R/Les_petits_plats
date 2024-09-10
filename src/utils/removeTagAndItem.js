import { resetDropdownItem } from './resetDropdownItem.js';
import { filterRecipesByTags } from './filterRecipesByTags.js';
import { reapplySelectedItems } from '../handlers/handleItemClick.js';
import { normalizeString } from './normalizeString.js';

/**
 * Supprime un tag du conteneur de tags et réinitialise l'élément en tête de liste correspondant
 * @param {String} text Le texte du tag à supprimer
 * @param {String} containerId L'identifiant du conteneur parent
 * @param {Map} selectedItems La collection des éléments sélectionnés
 */
export function removeTagAndItem(text, containerId, selectedItems) {
  const normalizedText = normalizeString(text);

  // Clé unique basée sur le dropdown et le texte normalisé
  const itemKey = `${containerId}:${normalizedText}`;

  // Récupère le conteneur des tags
  const tagsContainer = document.getElementById('tags-container');

  // Trouve le tag correspondant au texte et au containerId fourni en convertissant les tags en tableau pour utiliser find()
  const tag = Array.from(tagsContainer.getElementsByClassName('tag')).find(
    (tag) => tag.textContent.includes(text) && tag.getAttribute('data-container-id') === containerId,
  );
  // Si le tag est trouvé, il est supprimé du conteneur des tags
  if (tag) {
    tag.remove();
  }

  // Vérifie si 'selectedItems' est bien une Map
  if (!(selectedItems instanceof Map)) {
    console.error('selectedItems is not a valid Map:', selectedItems);
    return;
  }

  // Vérifie si `selectedItems` est défini et contient la clé de l'élément avant de tenter de supprimer l'élément de la Map
  if (selectedItems && selectedItems.has(itemKey)) {
    // Supprime l'élément de la Map `selectedItems`
    selectedItems.delete(itemKey);
  } else {
    // Avertit si l'élément à supprimer n'est pas trouvé dans `selectedItems`
    console.warn(`Item "${itemKey}" was not found in selectedItems.`);
  }

  // Réinitialise l'élément du dropdown en le remettant à sa position d'origine dans la liste déroulante
  resetDropdownItem(text, containerId);

  // Filtre et met à jour les recettes en fonction des éléments sélectionnés restants
  filterRecipesByTags(selectedItems).then(() => {
    // Réapplique les éléments sélectionnés restants après le filtrage
    reapplySelectedItems();
  });
}
