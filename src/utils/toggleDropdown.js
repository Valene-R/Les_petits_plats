/**
 * Gère l'ouverture et la fermeture d'un menu déroulant
 * @param {HTMLElement} button Le bouton qui déclenche l'ouverture/fermeture du dropdown
 * @param {HTMLElement} dropdownContent Le contenu du dropdown (éléments affichés dans le menu déroulant)
 * @param {HTMLElement} icon L'icône de chevron qui indique l'état du dropdown (ouvert/fermé)
 */
export function toggleDropdown(button, dropdownContent, icon) {
  const isVisible = dropdownContent.classList.contains('scale-y-100');

  if (isVisible) {
    // Si le dropdown est visible, commence la fermeture
    dropdownContent.classList.remove('scale-y-100'); // Rend le dropdown visible
    dropdownContent.classList.add('scale-y-0'); // Cache le dropdown
    dropdownContent.classList.remove('animate-dropdown-open');
    dropdownContent.classList.add('animate-dropdown-close');

    // Utilise setTimeout pour attendre la fin de la transition (300ms) avant de cacher le contenu et réinitialiser les angles arrondis
    setTimeout(() => {
      dropdownContent.classList.add('hidden');
      button.classList.remove('open-border-radius');
      button.classList.add('closed-border-radius');
      button.setAttribute('aria-expanded', 'false'); // Accessibilité
    }, 300);
  } else {
    // Si le dropdown est caché, commence l'ouverture
    dropdownContent.classList.remove('hidden');
    dropdownContent.classList.remove('scale-y-0');
    dropdownContent.classList.add('scale-y-100');
    dropdownContent.classList.remove('animate-dropdown-close');
    dropdownContent.classList.add('animate-dropdown-open');
    button.setAttribute('aria-expanded', 'true'); // Accessibilité

    // Change les coins du bouton pour indiquer que le dropdown est ouvert
    button.classList.remove('closed-border-radius');
    button.classList.add('open-border-radius');
  }

  // Pivote l'icône du dropdown
  icon.classList.toggle('rotate-180');
}
