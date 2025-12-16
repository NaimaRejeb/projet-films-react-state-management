import { useMovies } from '../context/MoviesContext';
import SearchBar from './SearchBar';

function Header() {
  const { favoriteIds } = useMovies();

  return (
    <header className="header">
      <div className="header-content">
        <h1>🎬 MovieFlix (Context)</h1>
        <SearchBar />
        <div className="favorites-badge">
          ⭐ {favoriteIds.length} Favoris
        </div>
      </div>
    </header>
  );
}

export default Header;