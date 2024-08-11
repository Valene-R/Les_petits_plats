/**
 * Crée un élément HTML pour un item de sélection du dropdown
 * @param {String} text Le texte de l'item de sélection
 * @returns {HTMLElement} L'élément HTML de l'item de sélection
 */
export function createDropdownItem(text) {
  const listItem = document.createElement('li');
  listItem.className = 'block pl-4 py-2 text-sm text-black hover:bg-customYellow font-li cursor-pointer';
  listItem.textContent = text;
  listItem.setAttribute('role', 'option'); // Déclare l'élément comme une option pour l'accessibilité

  return listItem;
}
