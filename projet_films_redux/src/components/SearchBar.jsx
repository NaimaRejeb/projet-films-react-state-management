import { useSelector, useDispatch } from 'react-redux';
import { selectSearchQuery } from '../redux/selectors';
import { setSearchQuery } from '../redux/moviesSlice';

function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Rechercher un film..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
    </div>
  );
}

export default SearchBar;