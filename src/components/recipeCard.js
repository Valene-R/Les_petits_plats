/**
 * Crée une carte de recette en tant qu'élément HTML
 * @param {Object} recipe Un objet contenant les données de la recette
 * @returns {HTMLElement} L'élément HTML représentant la carte de recette
 */
export function recipeCard(recipe) {
  // Crée l'élément principal de la carte
  const card = document.createElement('article');
  card.className =
    'recipe-card w-full max-w-[380px] h-[731px] rounded-radius21 overflow-hidden shadow-custom-card m-6 mt-10 bg-white';

  // Crée le conteneur de l'image
  const imageContainer = document.createElement('div');
  imageContainer.className = 'relative';

  // Ajoute l'image de la recette
  const image = document.createElement('img');
  // Utilise new URL et import.meta.url pour définir l'image avec un chemin absolu,
  // garantissant la résolution correcte du chemin après le build avec Vite
  image.src = new URL(`../assets/images/${recipe.image}`, import.meta.url).href;
  image.alt = recipe.name;
  image.className = 'w-full h-[253px] object-cover mb-4';

  // Crée une étiquette de temps et l'ajoute à l'image
  const timeTag = document.createElement('span');
  timeTag.className =
    'absolute w-[65px] h-[26px] top-5 right-5 bg-customYellow text-black text-xs rounded-radius14 flex items-center justify-center';
  timeTag.textContent = `${recipe.time}min`;

  imageContainer.appendChild(image);
  imageContainer.appendChild(timeTag);

  // Crée le contenu de la carte
  const cardContent = document.createElement('div');
  cardContent.className = 'px-6 py-4';

  // Ajoute le titre de la recette
  const cardTitle = document.createElement('h2');
  cardTitle.className = 'text-lg mb-6 font-display';
  cardTitle.textContent = recipe.name;

  // Ajoute un titre pour la description
  const descriptionTitle = document.createElement('h3');
  descriptionTitle.className = 'text-xs font-h3 text-customGrey mt-4 mb-4';
  descriptionTitle.textContent = 'RECETTE';

  // Ajoute la description de la recette
  const cardText = document.createElement('p');
  cardText.className = 'text-black text-sm line-clamp-4 mb-8 font-li';
  cardText.textContent = recipe.description;

  // Ajoute un titre pour les ingrédients
  const ingredientsTitle = document.createElement('h3');
  ingredientsTitle.className = 'text-xs font-h3 text-customGrey mt-4';
  ingredientsTitle.textContent = 'INGRÉDIENTS';

  // Crée la liste des ingrédients
  const ingredientsList = document.createElement('ul');
  ingredientsList.className = 'font-list grid grid-cols-2 gap-x-8 mt-4';

  // Ajoute chaque ingrédient à la liste
  recipe.ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement('li');
    ingredientItem.className = 'flex flex-col mb-4';

    const ingredientName = document.createElement('span');
    ingredientName.className = 'text-black font-list text-sm truncate';
    ingredientName.textContent = ingredient.ingredient;

    const ingredientQuantity = document.createElement('span');
    ingredientQuantity.className = 'text-customGrey text-sm';
    // Vérifie si la quantité est définie, sinon affiche '-'
    const quantity = ingredient.quantity != null ? ingredient.quantity : '-';
    // Vérifie si l'unité est définie, sinon affiche une chaîne vide
    const unit = ingredient.unit != null ? ingredient.unit : '';
    // Concatène la quantité et l'unité, supprime les espaces supplémentaires et affiche '-' si non définies
    ingredientQuantity.textContent = `${quantity} ${unit}`.trim() || '-';

    ingredientItem.appendChild(ingredientName);
    ingredientItem.appendChild(ingredientQuantity);
    ingredientsList.appendChild(ingredientItem);
  });

  // Ajoute tous les éléments au contenu de la carte
  cardContent.appendChild(cardTitle);
  cardContent.appendChild(descriptionTitle);
  cardContent.appendChild(cardText);
  cardContent.appendChild(ingredientsTitle);
  cardContent.appendChild(ingredientsList);

  // Ajoute l'image et le contenu à la carte
  card.appendChild(imageContainer);
  card.appendChild(cardContent);

  return card;
}
