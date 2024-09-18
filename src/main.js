import { displayRecipeCards } from './components/displayRecipeCards.js';
import { displayDropdownItems } from './components/displayDropdownItems.js';
import { updateRecipeCount } from './utils/updateRecipeCount.js';
import { mainRecipeSearch } from './utils/mainRecipeSearch.js';
import { getRecipes } from './services/api.js';
import { displayError } from './utils/displayError.js';
import { updateAllDropdownsItems } from './utils/updateAllDropdownsItems.js';
import { selectedItems } from './utils/state/selectedItemsState.js';
import { filterRecipesByTags } from './utils/filterRecipesByTags.js';
import { updateFilteredDropdownItems } from './utils/state/filteredDropdownItems.js';
import { resetAll } from './utils/reset.js';

/**
 * Configure le bouton de suppression du champ de recherche et gère la réinitialisation des recettes et des éléments filtrés
 * @param {HTMLElement} clearButton Le bouton de suppression
 * @param {HTMLElement} searchForm Le formulaire de recherche
 */
function configClearButton(clearButton, searchForm) {
  clearButton.addEventListener('click', async () => {
    searchForm.reset(); // Réinitialise le formulaire de recherche
    clearButton.classList.add('hidden'); // Cache le bouton de suppression

    await resetAll(); // Réinitialise tous les état de l'application
  });
}

/**
 * Gère la recherche lors de la soumission du formulaire
 * @param {Event} event L'événement de soumission du formulaire
 * @param {HTMLElement} recipeCardsContainer Le conteneur qui affichera les cartes de recettes
 */
async function handleSearch(event, recipeCardsContainer) {
  event.preventDefault();

  const searchButton = document.querySelector('.search-button');
  searchButton.disabled = true; // Désactive le bouton pendant le traitement du bloc try-catch pour éviter les soumissions multiples

  // Vérifie s'il y a des tags sélectionnés
  if (selectedItems.size > 0) {
    await resetAll();

    // Affiche une notification pour informer que les tags sont réinitialisés
    showToast('Les filtres ont été réinitialisés', 'info');
  }

  try {
    const searchQuery = document.getElementById('search').value.trim(); // Récupère et nettoie la requête de recherche
    let searchResults;

    if (searchQuery === '') {
      // Récupère toutes les recettes si aucune recherche n'est faite
      searchResults = await getRecipes();
    } else {
      // Sinon, recherche les recettes correspondant à la requête
      searchResults = await mainRecipeSearch(searchQuery, true); // Recherche stricte par mot complet
    }

    if (searchResults.length === 0) {
      // Si aucun résultat, affiche le message d'erreur
      displayError(
        recipeCardsContainer,
        `Aucune recette ne contient "${searchQuery}". Vous pouvez chercher "tarte aux pommes", "poisson", etc.`,
      );
    } else {
      // Filtre les résultats trouvés en fonction des tags sélectionnés
      await filterRecipesByTags(selectedItems, searchResults);
      // Met à jour les items des dropdowns avec les nouvelles recettes
      updateAllDropdownsItems(searchResults, document.getElementById('filter-dropdown-section'));
    }

    const clearButton = document.querySelector('button[aria-label="Clear search"]');
    clearButton.classList.toggle('hidden', searchQuery.length === 0); // Affiche ou cache le bouton de suppression selon la requête
  } catch (error) {
    console.error('Error during search:', error);
  } finally {
    searchButton.disabled = false; // Réactive le bouton une fois la recherche terminée
  }
}

/**
 * Affiche une notification d'information sous forme de toast
 * @param {string} message Le message à afficher dans la notification
 * @param {string} [type='info'] Le type de notification pour appliquer un style spécifique (ex : 'info', 'error', 'success', 'alert')
 * @param {number} [duration=2000] La durée pendant laquelle la notification est visible
 */
function showToast(message, type = 'info', duration = 2000) {
  // Crée l'élément de notification (toast)
  const toastNotification = document.createElement('div');
  toastNotification.className = `show-toast ${type}`;
  toastNotification.textContent = message;

  // Ajoute la notification au DOM
  document.body.appendChild(toastNotification);

  // Ajoute directement la classe 'visible' pour déclencher la transition
  toastNotification.classList.add('visible');

  // Supprime la notification après 2 secondes (visible pendant 2s + 0,3s de transition)
  setTimeout(() => {
    toastNotification.classList.remove('visible');

    // Attend la fin de la transition avant de supprimer l'élément du DOM
    toastNotification.addEventListener(
      'transitionend',
      () => {
        toastNotification.remove();
      },
      { once: true }, // L'événement ne sera déclenché qu'une seule fois
    );
  }, duration); // Durée d'affichage de 2 secondes avant suppression
}

/**
 * Initialise l'application au chargement de la page
 * en incluant le chargement des recettes, la configuration des événements
 * pour la recherche et l'affichage initial des éléments de l'interface
 */
async function init() {
  const filterDropdownSection = document.getElementById('filter-dropdown-section');
  const recipeCardsContainer = document.getElementById('recipe-cards-container');
  const searchInput = document.getElementById('search');
  const clearButton = document.querySelector('button[aria-label="Clear search"]');
  const searchForm = document.querySelector('form');

  try {
    // Récupère toutes les recettes
    const allRecipes = await getRecipes();

    // Affiche les dropdowns de filtrage dans le conteneur
    await displayDropdownItems(filterDropdownSection);

    // Récupère et affiche les recettes au chargement de la page
    displayRecipeCards(recipeCardsContainer, allRecipes);
    updateRecipeCount(allRecipes.length); // Met à jour le nombre de recettes affichées

    // Met à jour les items des dropdowns en fonction de toutes les recettes
    await updateFilteredDropdownItems(allRecipes);
    updateAllDropdownsItems(allRecipes, filterDropdownSection); // Met à jour les dropdowns avec ces éléments
  } catch (error) {
    console.error('Error loading recipes:', error);
    displayError(recipeCardsContainer, 'Échec du chargement des recettes. Veuillez réessayer plus tard.');
  }

  searchForm.addEventListener('submit', (event) => handleSearch(event, recipeCardsContainer)); // Ajoute un écouteur d'événement pour gérer la soumission du formulaire de recherche

  // Gère la recherche en temps réel lors de la saisie dans le champ principal de recherche
  searchInput.addEventListener('input', async () => {
    if (searchInput.value.length > 0) {
      clearButton.classList.remove('hidden');

      await resetAll();

      // Recherche les recettes correspondant à la sous-chaîne entrée par l'utilisateur
      const searchResults = await mainRecipeSearch(searchInput.value, false, selectedItems); // Recherche non stricte car s'effectue dynamiquement lors de la saisie
      displayRecipeCards(recipeCardsContainer, searchResults);
      updateAllDropdownsItems(searchResults, filterDropdownSection);

      if (searchResults.length === 0) {
        // Affiche un message si aucune recette ne correspond à la recherche
        displayError(
          recipeCardsContainer,
          `Aucune recette ne contient "${searchInput.value}". Vous pouvez chercher "tarte aux pommes", "poisson", etc.`,
        );
      }
    } else {
      clearButton.classList.add('hidden');
      const allRecipes = await getRecipes(); // Récupére toutes les recettes
      displayRecipeCards(recipeCardsContainer, allRecipes);
      updateAllDropdownsItems(allRecipes, filterDropdownSection); // Réinitialise les dropdowns
    }
    updateRecipeCount(); // Met à jour le nombre de recettes affichées
  });

  configClearButton(clearButton, searchForm, recipeCardsContainer, filterDropdownSection);
}

init();
