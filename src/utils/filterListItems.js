/**
 * Filtre les éléments d'un tableau en fonction d'une chaîne de caractères
 * @param {Array} items Le tableau d'éléments à filtrer
 * @param {String} searchQuery La chaîne de caractères pour filtrer les éléments
 * @param {Number} [minLength=3] La longueur minimale de la saisie pour déclencher le filtrage (par défaut 3 caractères)
 * @returns {Array} Le tableau filtré
 */
export function filterListItems(items, searchQuery, minLength = 3) {
  // Vérifie que 'items' est un tableau
  if (!Array.isArray(items)) {
    console.error('Expected an array for items, but got:', typeof items);
    return [];
  }

  // Vérifie si la requête est valide
  if (typeof searchQuery !== 'string' || searchQuery.length < minLength) {
    return items; // Retourne tous les items si la searchQuery est vide ou trop courte
  }

  // Retourne les éléments filtrés qui correspondent à la saisie, sans distinction de casse
  return items.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));
}
