/**
 * Normalise une chaîne de caractères en suivant un format spécifique
 * @param {string} stringToNormalize La chaîne de caractères à normaliser
 * @returns {string} La chaîne normalisée
 */
export function normalizeString(stringToNormalize) {
  // Convertit la chaîne entière en minuscules
  let lowerCaseString = stringToNormalize.toLowerCase();
  // Met en majuscule la première lettre de la chaîne
  let normalizedString = lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);

  // Liste des mots spécifiques à capitaliser
  const capitalizeWords = ['Dijon', 'Toulouse', 'Parme', 'Paris'];

  // Parcourt chaque mot de la liste pour les capitaliser dans la chaîne normalisée
  capitalizeWords.forEach((word) => {
    // Crée une expression régulière pour rechercher le mot en question, quelle que soit sa casse
    const regex = new RegExp(`\\b${word.toLowerCase()}\\b`, 'g');
    // Remplace le mot trouvé par sa version correctement capitalisée
    normalizedString = normalizedString.replace(regex, word);
  });

  return normalizedString;
}

/**
 * Normalise une chaîne de caractères spécifiquement pour la recherche
 * @param {string} stringToNormalize La chaîne de caractères à normaliser pour la recherche
 * @returns {string} La chaîne normalisée pour la recherche
 */
export function normalizeForSearch(stringToNormalize) {
  return stringToNormalize
    .toLowerCase() // Convertit toute la chaîne en minuscules
    .normalize('NFD') // Décompose les caractères accentués en base + diacritiques (é -> e + accent)
    .replace(/[\u0300-\u036f]/g, '') // Supprime les diacritiques (accents)
    .replace(/ç/g, 'c') // Remplace la cédille "ç" par un simple "c"
    .trim(); // Supprime les espaces en trop au début et à la fin
}
