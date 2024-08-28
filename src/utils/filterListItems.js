/**
 * Filtre les éléments d'un tableau en fonction d'une chaîne de caractères
 * @param {Array} items Le tableau d'éléments à filtrer
 * @param {String} searchQuery La chaîne de caractères pour filtrer les éléments
 * @param {Number} [minLength=3] La longueur minimale de la saisie pour déclencher le filtrage (par défaut 3 caractères)
 * @param {Boolean} [strictSearch=false] Si true, effectue une recherche stricte (mot ou groupe de mots exact)
 * @returns {Array} Le tableau filtré
 */
export function filterListItems(items, searchQuery, minLength = 3, strictSearch = false) {
  // Vérifie que 'items' est un tableau
  if (!Array.isArray(items)) {
    console.error('Expected an array for items, but got:', typeof items);
    return [];
  }

  // Vérifie si la requête est valide
  if (typeof searchQuery !== 'string' || searchQuery.length < minLength) {
    return items; // Retourne tous les items si la searchQuery est vide ou trop courte
  }

  // Retourne les éléments filtrés selon la méthode strict ou non strict
  return items.filter((item) => {
    // Normalise l'élément et la requête pour une comparaison insensible à la casse
    const normalizedItem = item.toLowerCase();
    const normalizedQuery = searchQuery.toLowerCase();

    // Crée une expression régulière pour trouver des correspondances exactes de mots ou de goupe de mots (insensible à la casse)
    const regex = new RegExp(`\\b${normalizedQuery}\\b`, 'i');

    // Retourne true si strictSearch est activé et que l'élément correspondant exactement à la recherche
    // sinon, si la recherche est trouvée comme sous-chaîne dans l'élélment
    return strictSearch ? regex.test(normalizedItem) : normalizedItem.includes(normalizedQuery);
  });
}
