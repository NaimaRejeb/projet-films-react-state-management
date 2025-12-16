import useMoviesStore from '../store/useMoviesStore';
import MovieCard from './MovieCard';

function MovieGrid() {
  const loading = useMoviesStore(state => state.loading);
  const getFilteredMovies = useMoviesStore(state => state.getFilteredMovies);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Chargement des films...</p>
      </div>
    );
  }

  const filteredMovies = getFilteredMovies();

  if (filteredMovies.length === 0) {
    return (
      <div className="no-results">
        Aucun film trouvé 🎬
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {filteredMovies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;