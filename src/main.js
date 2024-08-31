import { displayRecipeCards } from './components/displayRecipeCards.js';
import { displayDropdownItems } from './components/displayDropdownItems.js';
import { updateRecipeCount } from './utils/updateRecipeCount.js';
import { mainRecipeSearch } from './utils/mainRecipeSearch.js';
import { getRecipes } from './services/api.js';
import { displayError } from './utils/displayError.js';

/**
 * Réinitialise le bouton de recherche à son état initial
 */
function resetSearchButton() {
  const searchButton = document.querySelector('.search-button');
  const newButton = searchButton.cloneNode(true); // Clone le bouton

  searchButton.parentNode.replaceChild(newButton, searchButton); // Remplace l'ancien bouton par le clone
}

/**
 * Gère la recherche lors de la soumission du formulaire
 * @param {Event} event L'événement de soumission du formulaire
 */
async function handleSearch(event) {
  event.preventDefault();

  const searchQuery = document.getElementById('search').value.trim(); // Récupère et nettoie la requête de recherche
  const recipeCardsContainer = document.getElementById('recipe-cards-container');

  let searchResults;

  if (searchQuery === '') {
    // Récupère toutes les recettes si aucune recherche n'est faite
    searchResults = await getRecipes();
  } else {
    // Sinon, recherche les recettes correspondant à la requête
    searchResults = await mainRecipeSearch(searchQuery, true); // Recherche stricte par mot complet
  }

  // Affiche les résultats de recherche ou un message d'erreur si aucun résultat n'est trouvé
  displayRecipeCards(recipeCardsContainer, searchResults, searchQuery);
  updateRecipeCount();

  const clearButton = document.querySelector('button[aria-label="Clear search"]');
  clearButton.classList.toggle('hidden', searchQuery.length === 0); // Affiche ou cache le bouton selon la requête

  // Réinitialise le champ de recherche et le bouton après la soumission
  const searchInput = document.getElementById('search');
  searchInput.value = ''; // Vide le champ de recherche
  clearButton.classList.add('hidden'); // Cache la croix de suppression

  resetSearchButton(); // Réinitialise le bouton loupe à son état initial
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

  try {
    // Affiche les dropdowns de filtrage dans le conteneur
    displayDropdownItems(filterDropdownSection);

    // Récupère et affiche les recettes au chargement de la page
    const allRecipes = await getRecipes();
    displayRecipeCards(recipeCardsContainer, allRecipes);
    updateRecipeCount(); // Met à jour le nombre de recettes affichées
  } catch (error) {
    console.error('Error loading recipes:', error);
    displayError(recipeCardsContainer, 'Échec du chargement des recettes. Veuillez réessayer plus tard.');
  }

  const searchForm = document.querySelector('form');
  searchForm.addEventListener('submit', handleSearch); // Ajoute un écouteur d'événement pour gérer la soumission du formulaire de recherche

  // Gère la recherche en temps réel lors de la saisie dans le champ principal de recherche
  searchInput.addEventListener('input', async () => {
    if (searchInput.value.length > 0) {
      clearButton.classList.remove('hidden');

      // Recherche les recettes correspondant à la sous-chaîne entrée par l'utilisateur
      const searchResults = await mainRecipeSearch(searchInput.value, false); // Recherche non stricte car s'effectue dynamiquement lors de la saisie
      displayRecipeCards(recipeCardsContainer, searchResults);

      if (searchResults.length === 0) {
        // Affiche un message si aucune recette ne correspond à la recherche
        displayError(
          recipeCardsContainer,
          `Aucune recette ne contient "${searchInput.value}". Vous pouvez chercher "tarte aux pommes", "poisson", etc.`,
        );
      }
    } else {
      clearButton.classList.add('hidden');
      const allRecipes = await getRecipes(); // Recharge toutes les recettes
      displayRecipeCards(recipeCardsContainer, allRecipes);
    }
    updateRecipeCount(); // Met à jour le nombre de recettes affichées
  });

  // Gère le clic sur le bouton de suppression pour vider la saisie et réinitialiser l'affichage des recettes
  clearButton.addEventListener('click', () => {
    searchForm.reset(); // Réinitialise le formulaire
    clearButton.classList.add('hidden');

    getRecipes().then((allRecipes) => {
      displayRecipeCards(recipeCardsContainer, allRecipes); // Affiche toutes les recettes après réinitialisation
      updateRecipeCount(); // Met à jour le nombre de recettes affichées
    });
  });
}

init();
