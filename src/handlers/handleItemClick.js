import { addTag } from '../utils/addTag.js';
import { removeTagAndItem } from '../utils/removeTagAndItem.js';

/**
 * Gère le clic sur un item pour l'ajouter en tête de liste avec une couleur fixe et une croix pour la suppression
 * @param {HTMLElement} listItem L'élément de liste sélectionné
 * @param {String} text Le texte de l'item sélectionné
 * @param {String} containerId L'identifiant du conteneur parent
 */
export function handleItemClick(listItem, text, containerId) {
  // Vérifie si l'item est déjà sélectionné (croix déjà présente)
  if (listItem.querySelector('.remove-btn')) {
    return; // Ne rien faire si l'item est déjà sélectionné
  }

  // Déplace l'item sélectionné en tête de liste
  const dropdownListContainer = listItem.parentNode; // Accède au conteneur parent de listItem
  dropdownListContainer.prepend(listItem); // Insère listItem comme le premier enfant de dropdownListContainer

  // Applique le style pour indiquer que l'élément est sélectionné
  listItem.classList.add('bg-customYellow', 'text-black', 'font-bold', 'selected-item');
  listItem.classList.remove('hover:bg-customYellow', 'cursor-pointer');

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
  svgCross.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

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
    e.stopPropagation(); // Empêche le clic de déclencher handleItemClick à nouveau
    removeTagAndItem(text, containerId); // Supprime à la fois l'item du dropdown et le tag associé
  });

  // Ajoute le bouton de suppression (croix) à l'item de liste
  listItem.appendChild(removeButton);

  // Ajoute un tag associé à l'item sélectionné en dessous des dropdowns
  addTag(text, containerId);
}
