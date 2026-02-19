import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import { Link } from "react-router-dom";
import { getPopularMovies, searchMovies } from "../Api/Api";
import { useNavigate } from "react-router-dom";

const Home = ({ addToFavorite, favorites }) => {
  const [searchMovie, setSearchMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setError(null);
    } catch (err) {
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchMovie.trim()) {
      loadPopularMovies();
      return;
    }

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchMovie);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col w-full px-5 bg-gradient-to-r from-gray-600 to-gray-100">
      <div className="h-20 rounded-3xl shadow-2xl px-10 py-12 mt-8 mx-100 flex bg-gradient-to-l from-gray-600 to-gray-50  items-center gap-120">
        <form
          onSubmit={handleSearch}
          className="flex gap-10 bg-gradient-to-r from-gray-400 to-gray-100 shadow-2xl py-2 px-4 rounded-2xl"
        >
          <input
            className="outline-none shadow-2xl font-medium text-black"
            placeholder="Search for movies..."
            type="text"
            value={searchMovie}
            onChange={(e) => setSearchMovie(e.target.value)}
          />
          <button className="text-xl font-medium active:scale-95">
            Search <i class="ri-search-2-line"></i>
          </button>
        </form>

        <Link
          to="/favorite"
          className="px-4 py-2 active:scale-95 hover:scale-105 transition-all duration-300 bg-gray-300 shadow-2xl rounded-xl font-semibold text-xl"
        >
          Favorites <i class="ri-heart-line"></i>
        </Link>
      </div>

      {error && (
        <p className="text-red-500 text-center font-semibold mt-4">{error}</p>
      )}

      {loading ? (
        <div className="flex justify-center h-screen items-center font-bold text-3xl">
          Loading...
        </div>
      ) : (
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center mb-8">
            {searchMovie ? "Search Results" : "Popular Movies"}
          </h1>

          <div className="grid grid-cols-5 gap-10">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onFavorite={addToFavorite}
                isFavorite={favorites.some((fav) => fav.id === movie.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
