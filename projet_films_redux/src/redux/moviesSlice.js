import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'f56693ef90b07d80b122adc565d406c7';
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Thunk pour charger les genres
export const fetchGenres = createAsyncThunk(
  'movies/fetchGenres',
  async (_, { rejectWithValue }) => {
    if (!API_KEY) {
      return rejectWithValue('TMDB API key manquante');
    }

    try {
      const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`);
      if (!res.ok) throw new Error(`Requete genres echouee (${res.status})`);
      const data = await res.json();
      return Array.isArray(data.genres) ? data.genres : [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Thunk pour charger les films
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (searchQuery, { rejectWithValue }) => {
    if (!API_KEY) {
      return rejectWithValue('TMDB API key manquante');
    }

    const url = searchQuery
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&language=fr-FR`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Requete films echouee (${res.status})`);
      const data = await res.json();
      return Array.isArray(data.results) ? data.results : [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    favoriteIds: [],
    genres: [],
    selectedGenre: 'all',
    searchQuery: '',
    loading: true,
    error: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favoriteIds.includes(id)) {
        state.favoriteIds = state.favoriteIds.filter(favId => favId !== id);
      } else {
        state.favoriteIds.push(id);
      }
    },
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Genres
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        console.error('Erreur genres:', action.payload);
        state.genres = [];
      })
      // Movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        console.error('Erreur films:', action.payload);
        state.movies = [];
        state.loading = false;
      });
  },
});

export const { toggleFavorite, setSelectedGenre, setSearchQuery } = moviesSlice.actions;
export default moviesSlice.reducer;
