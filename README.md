# Les petits plats

Développez un algorithme de recherche en JavaScript

## Description

**Les petits plats** est un site web de recettes de cuisine permettant aux utilisateurs de chercher parmi plus de 1500 recettes du quotidien, simples et délicieuses.

## Technologies

Ce projet utilise les technologies suivantes:

- **JavaScript** : Pour le développement de l'algorithme de recherche.
- **Tailwind CSS** : Pour une conception rapide et réactive des interfaces utilisateur.
- **Vite** : Pour le bundling et le développement rapide.
- **Prettier** : Pour le formatage cohérent du code.
- **PostCSS** : Pour transformer les styles avec des plugins JavaScript (comme Autoprefixer).

## Extensions VS Code Recommandées

Pour assurer un environnement de développement cohérent, je recommande d'utiliser les extensions VS Code suivantes. Celles-ci sont listées dans le fichier `.vscode/extensions.json`.

### Extensions Recommandées

- **Prettier - Code formatter** : Pour un formatage de code cohérent.
- **Tailwind CSS IntelliSense** : Pour l'autocomplétion et la vérification des classes Tailwind CSS.

### Configurations Recommandées pour VS Code

Pour assurer une expérience de développement cohérente, appliquez les configurations suivantes dans vos paramètres VS Code personnels :

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Installation

Pour installer et configurer le projet :

- Clonez le dépôt :
  $ git clone <url du repo>
  $ cd nom-du-repo

- Installez les dépendances :
  $ npm install

## Utilisation

Pour démarrer le projet en mode développement, exécutez :
$ npm run dev

Pour créer une version en production, qui génère un fichier optimisé `style.css` dans un dossier `dist/`, exécutez :
$ npm run build

Pour prévisualiser la version en production, exécutez :
$ npm run preview
