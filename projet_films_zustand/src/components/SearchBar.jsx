import useMoviesStore from '../store/useMoviesStore';

function SearchBar() {
  const searchQuery = useMoviesStore(state => state.searchQuery);
  const setSearchQuery = useMoviesStore(state => state.setSearchQuery);

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