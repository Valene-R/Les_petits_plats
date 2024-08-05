/**
 * Affiche un message d'erreur dans le conteneur spécifié
 * @param {HTMLElement} container Le conteneur où afficher le message d'erreur
 * @param {string} message Le message d'erreur à afficher
 */
export function displayError(container, message) {
  const errorMessage = document.createElement('p');
  errorMessage.textContent = message;
  errorMessage.className = 'text-red-600 m-10 text-center text-lg md:text-xl lg:text-2xl';
  container.appendChild(errorMessage);
}
