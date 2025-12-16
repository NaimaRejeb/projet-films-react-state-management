import useMoviesStore from '../store/useMoviesStore';
import SearchBar from './SearchBar';

function Header() {
  const favoriteIds = useMoviesStore(state => state.favoriteIds);

  return (
    <header className="header">
      <div className="header-content">
        <h1>🎬 MovieFlix (Zustand)</h1>
        <SearchBar />
        <div className="favorites-badge">
          ⭐ {favoriteIds.length} Favoris
        </div>
      </div>
    </header>
  );
}

export default Header;