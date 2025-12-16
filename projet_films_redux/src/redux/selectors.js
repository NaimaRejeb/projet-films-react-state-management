// Selecteurs pour accéder facilement au state
export const selectMovies = (state) => state.movies.movies;
export const selectFavoriteIds = (state) => state.movies.favoriteIds;
export const selectGenres = (state) => state.movies.genres;
export const selectSelectedGenre = (state) => state.movies.selectedGenre;
export const selectSearchQuery = (state) => state.movies.searchQuery;
export const selectLoading = (state) => state.movies.loading;

// Selecteur pour obtenir les films favoris
export const selectFavoriteMovies = (state) => {
  const { movies, favoriteIds } = state.movies;
  return movies.filter(movie => favoriteIds.includes(movie.id));
};

// Selecteur pour obtenir les films filtrés
export const selectFilteredMovies = (state) => {
  const { movies, selectedGenre } = state.movies;
  
  if (selectedGenre === 'all') {
    return movies;
  }
  
  return movies.filter(movie =>
    movie.genre_ids?.includes(parseInt(selectedGenre))
  );
};

// Selecteur pour obtenir le nom d'un genre
export const selectGenreName = (genreId) => (state) => {
  const genre = state.movies.genres.find(g => g.id === genreId);
  return genre ? genre.name : '';
};
