import { useMovies } from '../context/MoviesContext';

function SearchBar() {
  const { searchQuery, setSearchQuery } = useMovies();

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Rechercher un film..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;