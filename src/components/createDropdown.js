import { toggleDropdown } from '../utils/toggleDropdown.js';

/**
 * Crée un menu déroulant pour les éléments de sélection (catégories : ingrédients, appareils, ustensiles)
 * @param {String} title Le titre du dropdown (le texte affiché sur le bouton)
 * @param {String} id L'identifiant unique du conteneur (utilisé pour relier le bouton au contenu du dropdown)
 * @returns {HTMLElement} Le conteneur HTML pour le dropdown
 */
export function createDropdown(title, id) {
  // Crée le conteneur principal du dropdown
  const dropdownContainer = document.createElement('div');
  dropdownContainer.className = 'relative inline-block text-left md:z-10';

  // Crée le bouton du dropdown
  const button = document.createElement('button');
  button.className =
    'inline-flex justify-between w-full text-base px-4 py-4 h-14 gap-16 items-center font-list border-none text-black bg-white rounded-xl shadow-sm hover:bg-gray-50 focus:outline-none';
  button.id = `${id}-button`;
  button.setAttribute('aria-haspopup', 'listbox'); // Attribut pour indiquer que le bouton ouvre une listbox
  button.setAttribute('aria-expanded', 'false'); // Attribut pour indiquer si le dropdown est ouvert ou fermé
  button.textContent = title;

  // Crée l'icône chevron du bouton en utilisant createElementNS pour plus de sécurité
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('id', `${id}-icon`);
  icon.setAttribute('class', 'transform transition-transform duration-300 ease-out');
  icon.setAttribute('width', '13');
  icon.setAttribute('height', '6');
  icon.setAttribute('viewBox', '0 0 15 8');
  icon.setAttribute('fill', 'none');

  const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  iconPath.setAttribute('d', 'M1 1L7.5 7L14 1');
  iconPath.setAttribute('stroke', '#1B1B1B');
  iconPath.setAttribute('stroke-linecap', 'round');
  icon.appendChild(iconPath);

  button.appendChild(icon);

  // Crée le conteneur pour le contenu du dropdown
  const dropdownContent = document.createElement('div');
  dropdownContent.className =
    ' transform origin-top hidden absolute z-10 w-full rounded-b-xl bg-white focus:outline-none';
  dropdownContent.setAttribute('role', 'listbox');
  dropdownContent.id = `${id}-content`;

  // Crée le conteneur pour la barre de recherche dans le dropdown
  const searchContainer = document.createElement('div');
  searchContainer.className =
    'flex items-center w-full h-9 max-w-[163px] py-3 pl-2 rounded-sm m-4 mt-0 mx-auto border border-customLightGrey';

  // Crée le champ de recherche
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = '';
  searchInput.className = 'w-full py-1 h-9 focus:outline-none border-t border-b';
  searchInput.id = `${id}-search`;

  // Crée le bouton croix pour effacer la saisie dans le champs de recherche
  const clearButton = document.createElement('button');
  clearButton.type = 'button';
  clearButton.className = 'hidden items-center justify-center';

  // Crée l'icône de la croix en utilisant createElementNS pour plus de sécurité
  const clearIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  clearIcon.setAttribute('width', '8');
  clearIcon.setAttribute('height', '8');
  clearIcon.setAttribute('viewBox', '0 0 8 8');
  clearIcon.setAttribute('fill', 'none');

  const clearPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  clearPath.setAttribute('d', 'M7 7L4 4M4 4L1 1M4 4L7 1M4 4L1 7');
  clearPath.setAttribute('stroke', '#7A7A7A');
  clearPath.setAttribute('stroke-linecap', 'round');
  clearPath.setAttribute('stroke-linejoin', 'round');
  clearIcon.appendChild(clearPath);

  clearButton.appendChild(clearIcon);

  // Crée le bouton de recherche avec une icône loupe
  const searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.className = 'flex items-center justify-center p-2';

  const searchIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  searchIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  searchIcon.setAttribute('viewBox', '0 0 512 512');
  searchIcon.setAttribute('class', 'h-[14px] w-[14px] fill-gray-300');

  const searchPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  searchPath.setAttribute(
    'd',
    'M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z',
  );
  searchIcon.appendChild(searchPath);

  searchButton.appendChild(searchIcon);

  // Ajoute l'input et le bouton de recherche au conteneur de recherche
  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(clearButton);
  searchContainer.appendChild(searchButton);

  // Crée le conteneur pour les éléments de sélection dans le dropdown
  const itemsContainer = document.createElement('ul');
  itemsContainer.className = 'py-1 list-none max-h-[251px] overflow-y-auto hide-scrollbar';
  itemsContainer.setAttribute('role', 'listbox');

  // Ajoute les éléments au contenu du dropdown
  dropdownContent.appendChild(searchContainer);
  dropdownContent.appendChild(itemsContainer);
  // Ajoute le bouton et le contenu du dropdown au conteneur principal
  dropdownContainer.appendChild(button);
  dropdownContainer.appendChild(dropdownContent);

  // Ajoute un événement au clic du bouton pour ouvrir/fermer le dropdown
  button.addEventListener('click', () => toggleDropdown(button, dropdownContent, icon));

  // Gére l'affichage de la croix
  searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
      clearButton.classList.remove('hidden');
    } else {
      clearButton.classList.add('hidden');
    }
  });

  // Gére le clic sur la croix pour vider le champ de recherche
  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    clearButton.classList.add('hidden');
    searchInput.focus();
  });

  return dropdownContainer;
}
