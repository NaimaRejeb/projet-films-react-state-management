import { useSelector, useDispatch } from 'react-redux';
import { selectFavoriteMovies } from '../redux/selectors';
import { toggleFavorite } from '../redux/moviesSlice';
import { IMAGE_BASE_URL } from '../redux/moviesSlice';

function FavoritesSidebar() {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector(selectFavoriteMovies);

  return (
    <div className="favorites-sidebar">
      <h2>⭐ Mes Favoris</h2>

      {favoriteMovies.length === 0 ? (
        <div className="empty-favorites">
          <p>Aucun favori pour le moment</p>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>
            Cliquez sur ⭐ pour ajouter des films
          </p>
        </div>
      ) : (
        favoriteMovies.map(movie => (
          <div key={movie.id} className="favorite-item">
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="favorite-info">
              <div className="favorite-title">{movie.title}</div>
              <div className="favorite-rating">
                ⭐ {movie.vote_average?.toFixed(1)}
              </div>
            </div>
            <button
              className="remove-btn"
              onClick={() => dispatch(toggleFavorite(movie.id))}
              title="Retirer des favoris"
            >
              ❌
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default FavoritesSidebar;