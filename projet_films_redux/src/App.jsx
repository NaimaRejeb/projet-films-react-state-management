import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres, fetchMovies } from './redux/moviesSlice';
import { selectSearchQuery } from './redux/selectors';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import MovieGrid from './components/MovieGrid';
import FavoritesSidebar from './components/FavoritesSidebar';

function App() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);

  // Charger les genres au démarrage
  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  // Charger les films quand la recherche change
  useEffect(() => {
    dispatch(fetchMovies(searchQuery));
  }, [dispatch, searchQuery]);

  return (
    <div>
      <Header />
      <div className="main-container">
        <div>
          <FilterBar />
          <MovieGrid />
        </div>
        <FavoritesSidebar />
      </div>
    </div>
  );
}

export default App;