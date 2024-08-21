import { createTag } from '../components/createTag.js';
import { removeTagAndItem } from './removeTagAndItem.js';

/**
 * Ajoute un tag dans le conteneur de tags
 * @param {String} text Le texte du tag à ajouter
 * @param {String} containerId L'identifiant du conteneur parent
 * @param {Map} selectedItems La collection des éléments sélectionnés pour gérer l'état
 */
export function addTag(text, containerId, selectedItems) {
  // Sélectionne le conteneur des tags
  const tagsContainer = document.getElementById('tags-container');

  // Crée un tag avec un callback pour sa suppression :
  // fonction qui sera exécutée au clic sur le bouton de suppression du tag
  const tag = createTag(text, containerId, () => {
    removeTagAndItem(text, containerId, selectedItems);
  });

  // Ajoute le tag au conteneur
  tagsContainer.appendChild(tag);
}
