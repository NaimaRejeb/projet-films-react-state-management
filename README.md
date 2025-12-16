# 🎬 Projet Films - Comparaison des Gestionnaires d'État React

Ce projet démontre **trois approches différentes** pour gérer l'état dans une application React : **useContext**, **Redux Toolkit**, et **Zustand**.

## 📸 Captures d'écran

### Interface utilisateur
![Interface Utilisateur](./screenshots/UI%20.png)

---

## 📁 Structure du Projet

```
Projet_Films/
├── projet_films_context/    # Version avec useContext
├── projet_films_redux/       # Version avec Redux Toolkit
├── projet_films_zustand/     # Version avec Zustand
└── README.md                 # Ce fichier
```

---

## 🎯 Fonctionnalités

✅ Affichage des films populaires via l'API TMDB  
✅ Recherche de films en temps réel  
✅ Filtrage par genres  
✅ Gestion des favoris  
✅ Interface responsive et moderne  

---

## 🔄 Comparaison des Trois Approches

### 1️⃣ **useContext** - API React Native

#### 📋 Description
Utilise l'API Context de React pour partager l'état entre les composants sans prop drilling.

#### 📦 Dépendances
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
}
```

#### 🏗️ Architecture
```
src/
├── context/
│   └── MoviesContext.jsx    # Provider et hook useMovies
├── components/
└── App.jsx
```

#### ✅ Avantages
- ✨ **Natif React** : Pas de dépendance externe
- 🚀 **Simple** : Facile à comprendre pour les débutants
- 📦 **Léger** : Aucune bibliothèque supplémentaire
- 🔧 **Flexible** : Convient pour des états simples à moyens

#### ❌ Inconvénients
- 🐌 **Performance** : Tous les consommateurs re-rendent lors d'un changement
- 📝 **Boilerplate** : Nécessite Provider, Context, et hook personnalisé
- 🔍 **DevTools** : Pas d'outils de débogage dédiés
- 📊 **Scalabilité** : Devient complexe avec des états volumineux

#### 💻 Exemple de code
```jsx
// MoviesContext.jsx
const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  
  return (
    <MoviesContext.Provider value={{ movies, favoriteIds }}>
      {children}
    </MoviesContext.Provider>
  );
};

// Utilisation dans un composant
const { movies, favoriteIds } = useMovies();
```

#### 📸 Captures - useContext
![Architecture useContext](./screenshots/context-architecture.png)
![Implémentation useContext](./screenshots/context-code.png)

---

### 2️⃣ **Redux Toolkit** - État Global Robuste

#### 📋 Description
Redux Toolkit est la méthode officielle et recommandée pour utiliser Redux avec moins de boilerplate.

#### 📦 Dépendances
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "@reduxjs/toolkit": "^2.x",
  "react-redux": "^9.x"
}
```

#### 🏗️ Architecture
```
src/
├── redux/
│   ├── store.js          # Configuration du store
│   ├── moviesSlice.js    # Slice avec reducers et actions
│   └── selectors.js      # Sélecteurs réutilisables
├── components/
└── App.jsx
```

#### ✅ Avantages
- 🛠️ **DevTools puissants** : Redux DevTools pour le debugging
- 📊 **Scalabilité** : Parfait pour les grandes applications
- 🔄 **Middleware** : Support pour async (thunks), logging, etc.
- 🎯 **Immuabilité** : Utilise Immer pour faciliter les mises à jour
- 📚 **Écosystème riche** : Nombreuses extensions et intégrations
- ⚡ **Performance** : Optimisations avec useSelector

#### ❌ Inconvénients
- 📝 **Verbeux** : Plus de code à écrire (même avec RTK)
- 🎓 **Courbe d'apprentissage** : Concepts à maîtriser (reducers, actions, thunks)
- 📦 **Bundle size** : Plus lourd que Zustand
- 🔧 **Configuration** : Setup initial plus complexe

#### 💻 Exemple de code
```jsx
// moviesSlice.js
const moviesSlice = createSlice({
  name: 'movies',
  initialState: { movies: [], favoriteIds: [] },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favoriteIds.includes(id)) {
        state.favoriteIds = state.favoriteIds.filter(fid => fid !== id);
      } else {
        state.favoriteIds.push(id);
      }
    }
  }
});

// Utilisation dans un composant
const movies = useSelector(selectMovies);
const dispatch = useDispatch();
dispatch(toggleFavorite(movieId));
```

#### 📸 Captures - Redux Toolkit
![Architecture Redux](./screenshots/redux-architecture.png)
![Redux DevTools](./screenshots/redux-devtools.png)
![Implémentation Redux](./screenshots/redux-code.png)

---

### 3️⃣ **Zustand** - Simple et Performant

#### 📋 Description
Zustand est une bibliothèque de gestion d'état minimaliste, moderne et performante basée sur les hooks.

#### 📦 Dépendances
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "zustand": "^5.0.9"
}
```

#### 🏗️ Architecture
```
src/
├── store/
│   └── useMoviesStore.js    # Store unique avec état et actions
├── components/
└── App.jsx
```

#### ✅ Avantages
- 🚀 **Simple** : API intuitive et minimaliste
- ⚡ **Performance** : Re-renders optimisés automatiquement
- 📦 **Léger** : ~1KB (vs ~40KB pour Redux)
- 🔧 **Pas de Provider** : Utilisation directe du hook
- 💡 **Flexible** : Supporte middleware, devtools, persist
- 🎯 **TypeScript** : Excellent support natif

#### ❌ Inconvénients
- 🆕 **Moins mature** : Écosystème plus petit que Redux
- 📚 **Moins de ressources** : Moins de tutoriels et documentation
- 🏢 **Adoption** : Moins utilisé en entreprise que Redux
- 🔍 **DevTools** : Support limité comparé à Redux

#### 💻 Exemple de code
```jsx
// useMoviesStore.js
const useMoviesStore = create((set, get) => ({
  movies: [],
  favoriteIds: [],
  
  toggleFavorite: (id) => set((state) => ({
    favoriteIds: state.favoriteIds.includes(id)
      ? state.favoriteIds.filter(fid => fid !== id)
      : [...state.favoriteIds, id]
  })),
}));

// Utilisation dans un composant
const movies = useMoviesStore(state => state.movies);
const toggleFavorite = useMoviesStore(state => state.toggleFavorite);
toggleFavorite(movieId);
```

#### 📸 Captures - Zustand
![Architecture Zustand](./screenshots/zustand-architecture.png)
![Implémentation Zustand](./screenshots/zustand-code.png)

---

## 📊 Tableau Comparatif Détaillé

| Critère | useContext | Redux Toolkit | Zustand |
|---------|-----------|---------------|---------|
| **Bundle Size** | 0 KB | ~40 KB | ~1 KB |
| **Complexité** | 🟢 Simple | 🟡 Moyenne | 🟢 Simple |
| **Performance** | 🟡 Moyenne | 🟢 Bonne | 🟢 Excellente |
| **DevTools** | ❌ Non | ✅ Oui | 🟡 Limité |
| **Boilerplate** | 🟡 Moyen | 🟡 Moyen | 🟢 Minimal |
| **Courbe d'apprentissage** | 🟢 Facile | 🔴 Difficile | 🟢 Facile |
| **Scalabilité** | 🟡 Moyenne | 🟢 Excellente | 🟢 Bonne |
| **Async handling** | ⚙️ Manuel | ✅ Intégré (thunks) | ⚙️ Manuel |
| **Middleware** | ❌ Non | ✅ Oui | 🟡 Oui |
| **TypeScript** | 🟢 Bon | 🟢 Bon | 🟢 Excellent |
| **Écosystème** | 🟢 React natif | 🟢 Très riche | 🟡 Croissant |
| **Provider requis** | ✅ Oui | ✅ Oui | ❌ Non |

---

## 🎓 Quand Utiliser Chaque Approche ?

### 🔵 Utilisez **useContext** si :
- ✅ Votre application est **petite à moyenne**
- ✅ Vous voulez éviter les **dépendances externes**
- ✅ L'état est **simple** (pas trop de mises à jour)
- ✅ Vous débutez avec React
- ❌ Évitez pour des applications complexes avec beaucoup d'état global

### 🔴 Utilisez **Redux Toolkit** si :
- ✅ Application **grande et complexe**
- ✅ Besoin de **DevTools avancés** pour le debugging
- ✅ Travail en **équipe** avec des standards établis
- ✅ Gestion complexe d'**état asynchrone**
- ✅ Écosystème d'**extensions** requis
- ❌ Overkill pour des applications simples

### 🟢 Utilisez **Zustand** si :
- ✅ Vous voulez un **compromis parfait** entre simplicité et puissance
- ✅ **Performance** est prioritaire
- ✅ Vous voulez une **API moderne** et intuitive
- ✅ Application de **taille moyenne à grande**
- ✅ Vous aimez le **code minimal**
- ❌ Si vous avez besoin d'un écosystème Redux mature

---

## ⚡ Performance Comparée

### Re-renders
```
useContext:    ████████████ (Tous les consommateurs)
Redux Toolkit: ████░░░░░░░░ (Sélecteurs optimisés)
Zustand:       ██░░░░░░░░░░ (Sélecteurs automatiques)
```

### Bundle Size
```
useContext:    ░░░░░░░░░░░░ (0 KB)
Redux Toolkit: ████████████ (40 KB)
Zustand:       █░░░░░░░░░░░ (1 KB)
```

### Complexité Code
```
useContext:    ████████░░░░ (Moyenne)
Redux Toolkit: ████████████ (Élevée)
Zustand:       ████░░░░░░░░ (Faible)
```

---

## 🚀 Installation et Exécution

### 1. Clone le repository
```bash
git clone <votre-repo>
cd Projet_Films
```

### 2. Installer les dépendances pour chaque projet

#### Version useContext
```bash
cd projet_films_context
npm install
npm run dev
```
➡️ Ouvre http://localhost:5173

#### Version Redux Toolkit
```bash
cd projet_films_redux
npm install
npm run dev
```
➡️ Ouvre http://localhost:5173

#### Version Zustand
```bash
cd projet_films_zustand
npm install
npm run dev
```
➡️ Ouvre http://localhost:5173

---

## 🔑 Configuration API

Créez un fichier `.env` dans chaque projet :

```env
VITE_TMDB_API_KEY=votre_clé_api_tmdb
```

Obtenez votre clé API gratuite sur [TMDB](https://www.themoviedb.org/settings/api).

---

---

## 🎨 Technologies Utilisées

- ⚛️ **React 19.2** - Framework UI
- ⚡ **Vite 7.3** - Build tool
- 🎬 **TMDB API** - Base de données de films
- 💅 **CSS Modules** - Styling
- 🔄 **Redux Toolkit** - Gestion d'état (version Redux)
- 🐻 **Zustand** - Gestion d'état (version Zustand)

---

## 📚 Ressources et Documentation

### useContext
- [React Context Documentation](https://react.dev/reference/react/useContext)
- [Context Best Practices](https://react.dev/learn/passing-data-deeply-with-context)

### Redux Toolkit
- [Redux Toolkit Official](https://redux-toolkit.js.org/)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools)
- [React Redux Hooks](https://react-redux.js.org/api/hooks)

### Zustand
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Zustand Recipes](https://docs.pmnd.rs/zustand/guides/updating-state)

---



## 👨‍💻 Auteur

**Naima**  
Projet réalisé dans le cadre du cours MERN - 5ème année

---

## 📝 License

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

---

## 🙏 Remerciements

- TMDB pour leur API gratuite
- La communauté React
- Les créateurs de Redux Toolkit et Zustand

---

**⭐ Si ce projet vous a aidé, n'oubliez pas de lui donner une étoile !**
