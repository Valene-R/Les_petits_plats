/**
 * Crée un tag avec un bouton de suppression
 * @param {String} text Le texte du tag
 * @param {String} containerId L'identifiant du conteneur parent
 * @param {Function} onRemove Callback à exécuter lorsque le tag est supprimé
 * @returns {HTMLElement} L'élément HTML représentant le tag
 */
export function createTag(text, containerId, onRemove) {
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

  // Ajoute un événement 'click' au bouton de suppression, exécutant `onRemove` pour supprimer le tag
  removeButton.addEventListener('click', onRemove);

  // Ajoute le bouton de suppression au tag
  tag.appendChild(removeButton);

  return tag;
}
