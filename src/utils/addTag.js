import { removeTagAndItem } from './removeTagAndItem.js';

/**
 * Ajoute un tag dans le conteneur de tags
 * @param {String} text Le texte du tag à ajouter
 * @param {String} containerId L'identifiant du conteneur parent
 * @param {Map} selectedItems La collection des éléments sélectionnés pour gérer l'état
 */
export function addTag(text, containerId, selectedItems) {
  const tagsContainer = document.getElementById('tags-container');

  // Crée un nouvel élément 'div' pour représenter le tag
  const tag = document.createElement('div');
  tag.className = 'tag bg-customYellow text-black h-[53px] p-4 inline-block rounded-[10px] font-li items-center';
  tag.textContent = text; // Définit le texte du tag
  tag.setAttribute('data-container-id', containerId); // Associe le tag à son conteneur parent en utilisant 'data-container-id'

  // Crée un bouton pour permettre la suppression du tag
  const removeButton = document.createElement('button');
  removeButton.className = 'remove-btn ml-2';

  // Crée le SVG croix de manière sécurisée
  const svgCrossTag = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgCrossTag.setAttribute('width', '10');
  svgCrossTag.setAttribute('height', '10');
  svgCrossTag.setAttribute('viewBox', '0 0 14 13');
  svgCrossTag.setAttribute('fill', 'none');

  const pathCrossTag = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathCrossTag.setAttribute('d', 'M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5');
  pathCrossTag.setAttribute('stroke', '#1B1B1B');
  pathCrossTag.setAttribute('stroke-width', '2.16667');
  pathCrossTag.setAttribute('stroke-linecap', 'round');
  pathCrossTag.setAttribute('stroke-linejoin', 'round');

  svgCrossTag.appendChild(pathCrossTag);
  removeButton.appendChild(svgCrossTag);

  removeButton.addEventListener('click', () => {
    removeTagAndItem(text, containerId, selectedItems); // Associe le clic du bouton à la suppression du tag et met à jour l'état des éléments sélectionnés
  });

  tag.appendChild(removeButton);
  tagsContainer.appendChild(tag);
}
