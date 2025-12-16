import useMoviesStore from '../store/useMoviesStore';
import { IMAGE_BASE_URL } from '../store/useMoviesStore';

function MovieCard({ movie }) {
  const favoriteIds = useMoviesStore(state => state.favoriteIds);
  const toggleFavorite = useMoviesStore(state => state.toggleFavorite);
  const getGenreName = useMoviesStore(state => state.getGenreName);
  const isFavorite = favoriteIds.includes(movie.id);

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div className="movie-card">
      <button
        className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
        onClick={() => toggleFavorite(movie.id)}
      >
        {isFavorite ? '⭐' : '☆'}
      </button>

      <img src={posterUrl} alt={movie.title} />

      <div className="movie-info">
        <div className="movie-title">{movie.title}</div>
        
        <div className="movie-details">
          <div className="movie-rating">
            ⭐ {movie.vote_average?.toFixed(1)}
          </div>
          <div className="movie-year">
            {movie.release_date?.split('-')[0]}
          </div>
        </div>

        <div className="genre-tags">
          {movie.genre_ids?.slice(0, 2).map(genreId => (
            <span key={genreId} className="genre-tag">
              {getGenreName(genreId)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;