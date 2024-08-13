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
