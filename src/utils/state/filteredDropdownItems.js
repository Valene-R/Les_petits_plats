/**
 * Variable globale pour stocker les items filtrés des dropdowns
 * Mise à jour après la recherche principale et lors des filtrages successifs
 * @type {Object}
 * @property {Array<string>} ingredients Les ingrédients filtrés
 * @property {Array<string>} appliances Les appareils filtrés
 * @property {Array<string>} ustensils Les ustensiles filtrés
 */
export let filteredDropdownItems = {
  ingredients: [],
  appliances: [],
  ustensils: [],
};
