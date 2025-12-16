import { useSelector } from 'react-redux';
import { selectFilteredMovies, selectLoading } from '../redux/selectors';
import MovieCard from './MovieCard';

function MovieGrid() {
  const filteredMovies = useSelector(selectFilteredMovies);
  const loading = useSelector(selectLoading);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Chargement des films...</p>
      </div>
    );
  }

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