import { resetDropdownItem } from './resetDropdownItem.js';

/**
 * Supprime un tag du conteneur de tags et réinitialise l'élément en tête de liste correspondant
 * @param {String} text Le texte du tag à supprimer
 * @param {String} containerId L'identifiant du conteneur parent
 */
export function removeTagAndItem(text, containerId) {
  // Récupère le conteneur des tags
  const tagsContainer = document.getElementById('tags-container');

  // Trouve le tag correspondant au texte et au containerId fourni en convertissant les tags en tableau pour utiliser find()
  const tag = Array.from(tagsContainer.getElementsByClassName('tag')).find(
    (tag) => tag.textContent.includes(text) && tag.getAttribute('data-container-id') === containerId,
  );
  // Si le tag est trouvé, il est supprimé du conteneur
  if (tag) {
    tag.remove();
  }

  // Réinitialise l'élément du dropdown en le remettant à sa position d'origine dans la liste déroulante
  resetDropdownItem(text, containerId);
}
