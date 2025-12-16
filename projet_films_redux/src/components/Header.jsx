import { useSelector } from 'react-redux';
import { selectFavoriteIds } from '../redux/selectors';
import SearchBar from './SearchBar';

function Header() {
  const favoriteIds = useSelector(selectFavoriteIds);

  return (
    <header className="header">
      <div className="header-content">
        <h1>🎬 MovieFlix (Redux)</h1>
        <SearchBar />
        <div className="favorites-badge">
          ⭐ {favoriteIds.length} Favoris
        </div>
      </div>
    </header>
  );
}

export default Header;