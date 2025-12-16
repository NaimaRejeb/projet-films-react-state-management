import { createContext, useContext, useState, useEffect } from 'react';

const MoviesContext = createContext();

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'f56693ef90b07d80b122adc565d406c7';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// eslint-disable-next-line react-refresh/only-export-components
export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMovies must be used within MoviesProvider');
  }
  return context;
};

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Charger les genres
  useEffect(() => {
    const fetchGenres = async () => {
      if (!API_KEY) {
        console.error('TMDB API key manquante. Ajoutez VITE_TMDB_API_KEY dans votre environnement.');
        setGenres([]);
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`);
        if (!res.ok) throw new Error(`Requete genres echouee (${res.status})`);
        const data = await res.json();
        setGenres(Array.isArray(data.genres) ? data.genres : []);
      } catch (err) {
        console.error('Erreur genres:', err);
        setGenres([]);
      }
    };

    fetchGenres();
  }, []);

  // Charger les films populaires ou la recherche
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      if (!API_KEY) {
        console.error('TMDB API key manquante. Ajoutez VITE_TMDB_API_KEY dans votre environnement.');
        setMovies([]);
        setLoading(false);
        return;
      }

      const url = searchQuery
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&language=fr-FR`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Requete films echouee (${res.status})`);
        const data = await res.json();
        setMovies(Array.isArray(data.results) ? data.results : []);
      } catch (err) {
        console.error('Erreur films:', err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  // Toggle favori 
  const toggleFavorite = (id) => {
    setFavoriteIds(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  // Obtenir les films favoris
  const getFavoriteMovies = () => {
    return movies.filter(movie => favoriteIds.includes(movie.id));
  };

  // Filtrer par genre
  const getFilteredMovies = () => {
    let filtered = movies;

    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie =>
        movie.genre_ids?.includes(parseInt(selectedGenre))
      );
    }

    return filtered;
  };

  // Obtenir le nom du genre
  const getGenreName = (genreId) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : '';
  };

  const value = {
    movies,
    favoriteIds,
    genres,
    selectedGenre,
    searchQuery,
    loading,
    setSelectedGenre,
    setSearchQuery,
    toggleFavorite,
    getFavoriteMovies,
    getFilteredMovies,
    getGenreName,
    IMAGE_BASE_URL
  };

  return (
    <MoviesContext.Provider value={value}>
      {children}
    </MoviesContext.Provider>
  );
};