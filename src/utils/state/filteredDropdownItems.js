import { getUniqueRecipeComponents } from '../../services/api';
import { selectedItems } from './selectedItemsState';

// Stocke les items filtrés des dropdowns
let filteredDropdownItems = {
  ingredients: [],
  appliances: [],
  ustensils: [],
};

/**
 * Retourne les items filtrés actuels
 * @returns {Object} Un objet contenant les ingrédients, appareils et ustensiles filtrés
 */
export function getFilteredDropdownItems() {
  return filteredDropdownItems;
}

/**
 * Met à jour les items filtrés des dropdowns
 * @param {Object} newItems Un objet contenant les nouveaux items filtrés pour les ingrédients, appareils et ustensiles
 */
export function setFilteredDropdownItems(newItems) {
  if (!newItems.ingredients.length && !newItems.appliances.length && !newItems.ustensils.length) {
    return;
  }

  filteredDropdownItems = { ...filteredDropdownItems, ...newItems }; // Met à jour les items existants avec les nouveaux
}

/**
 * Met à jour les items filtrés en fonction des recettes fournies
 * Si aucun tag n'est sélectionné, charge tous les items disponibles
 * @param {Array} recipes La liste des recettes à partir desquelles extraire les items uniques
 */
export async function updateFilteredDropdownItems(recipes) {
  try {
    // Vérifie si aucun tag n'est sélectionné
    if (selectedItems.size === 0) {
      // Si aucun tag n'est sélectionné, on retourne tous les ingrédients, appareils et ustensiles
      const allComponents = await getUniqueRecipeComponents(recipes);
      setFilteredDropdownItems(allComponents);
      return;
    }

    // Récupère les ingrédients, appareils et ustensiles uniques à partir des recettes fournies
    const { ingredients, appliances, ustensils } = await getUniqueRecipeComponents(recipes);

    if (!ingredients.length && !appliances.length && !ustensils.length) {
      return;
    }

    // Met à jour les items filtrés pour chaque catégorie
    setFilteredDropdownItems({
      ingredients: Array.from(ingredients),
      appliances: Array.from(appliances),
      ustensils: Array.from(ustensils),
    });
  } catch (error) {
    console.error('Error when updating filtered items:', error);
  }
}
