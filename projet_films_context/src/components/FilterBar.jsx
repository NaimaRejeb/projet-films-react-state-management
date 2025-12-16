import { useMovies } from '../context/MoviesContext';

function FilterBar() {
  const { genres, selectedGenre, setSelectedGenre } = useMovies();

  const popularGenres = genres.filter(g => 
    [28, 35, 18, 27, 878, 53].includes(g.id)
  ); // Action, Comedy, Drama, Horror, Sci-Fi, Thriller

  return (
    <div className="filter-section">
      <h3>Filtrer par genre</h3>
      <div className="filter-bar">
        <button
          className={`filter-btn ${selectedGenre === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedGenre('all')}
        >
          Tous
        </button>
        {popularGenres.map(genre => (
          <button
            key={genre.id}
            className={`filter-btn ${selectedGenre === genre.id.toString() ? 'active' : ''}`}
            onClick={() => setSelectedGenre(genre.id.toString())}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar; 