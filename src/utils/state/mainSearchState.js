// Détermine si la recherche principale a été effectuée
let isMainSearchPerformed = false;

/**
 * Retourne l'état indiquant si la recherche principale a été effectuée
 * @returns {Boolean} Renvoie true si la recherche principale a été effectuée, sinon false
 */
export function getMainSearchPerformed() {
  return isMainSearchPerformed;
}

/**
 * Met à jour l'état indiquant si la recherche principale a été effectuée
 * @param {Boolean} value Un booléen indiquant si la recherche principale a été effectuée (true) ou non (false)
 */
export function setMainSearchPerformed(value) {
  isMainSearchPerformed = value;
}
