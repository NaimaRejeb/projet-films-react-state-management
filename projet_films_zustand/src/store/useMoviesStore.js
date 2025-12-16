import { create } from 'zustand';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'f56693ef90b07d80b122adc565d406c7';
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const useMoviesStore = create((set, get) => ({
  // État
  movies: [],
  favoriteIds: [],
  genres: [],
  selectedGenre: 'all',
  searchQuery: '',
  loading: true,

  // Actions
  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  
  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().fetchMovies();
  },

  toggleFavorite: (id) => set((state) => ({
    favoriteIds: state.favoriteIds.includes(id)
      ? state.favoriteIds.filter(favId => favId !== id)
      : [...state.favoriteIds, id]
  })),

  // Fetch genres
  fetchGenres: async () => {
    if (!API_KEY) {
      console.error('TMDB API key manquante. Ajoutez VITE_TMDB_API_KEY dans votre environnement.');
      set({ genres: [] });
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`);
      if (!res.ok) throw new Error(`Requete genres echouee (${res.status})`);
      const data = await res.json();
      set({ genres: Array.isArray(data.genres) ? data.genres : [] });
    } catch (err) {
      console.error('Erreur genres:', err);
      set({ genres: [] });
    }
  },

  // Fetch movies
  fetchMovies: async () => {
    set({ loading: true });

    if (!API_KEY) {
      console.error('TMDB API key manquante. Ajoutez VITE_TMDB_API_KEY dans votre environnement.');
      set({ movies: [], loading: false });
      return;
    }

    const { searchQuery } = get();
    const url = searchQuery
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&language=fr-FR`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Requete films echouee (${res.status})`);
      const data = await res.json();
      set({ movies: Array.isArray(data.results) ? data.results : [], loading: false });
    } catch (err) {
      console.error('Erreur films:', err);
      set({ movies: [], loading: false });
    }
  },

  // Sélecteurs (fonctions helper)
  getFavoriteMovies: () => {
    const { movies, favoriteIds } = get();
    return movies.filter(movie => favoriteIds.includes(movie.id));
  },

  getFilteredMovies: () => {
    const { movies, selectedGenre } = get();
    
    if (selectedGenre === 'all') {
      return movies;
    }
    
    return movies.filter(movie =>
      movie.genre_ids?.includes(parseInt(selectedGenre))
    );
  },

  getGenreName: (genreId) => {
    const { genres } = get();
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : '';
  },
}));

export default useMoviesStore;
