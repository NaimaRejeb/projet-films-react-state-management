import { useEffect } from 'react';
import useMoviesStore from './store/useMoviesStore';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import MovieGrid from './components/MovieGrid';
import FavoritesSidebar from './components/FavoritesSidebar';

function App() {
  const fetchGenres = useMoviesStore(state => state.fetchGenres);
  const fetchMovies = useMoviesStore(state => state.fetchMovies);
  const searchQuery = useMoviesStore(state => state.searchQuery);

  // Charger les genres au démarrage
  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  // Charger les films quand la recherche change
  useEffect(() => {
    fetchMovies(searchQuery);
  }, [fetchMovies, searchQuery]);

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