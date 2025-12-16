import { useSelector, useDispatch } from 'react-redux';
import { selectFavoriteIds, selectGenreName } from '../redux/selectors';
import { toggleFavorite } from '../redux/moviesSlice';
import { IMAGE_BASE_URL } from '../redux/moviesSlice';

function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavoriteIds);
  const isFavorite = favoriteIds.includes(movie.id);

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <div className="movie-card">
      <button
        className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
        onClick={() => dispatch(toggleFavorite(movie.id))}
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
              {useSelector(selectGenreName(genreId))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;