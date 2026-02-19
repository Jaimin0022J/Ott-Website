import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = "435cfbd8a60ad630664daddfec1e546e";

const Moviepage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const [trailerKey, setTrailerKey] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const trailer = data.results.find(
          (video) =>
            video.site === "YouTube" && video.type === "Trailer"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      });
  }, [id]);

  if (!movie) {
    return (
      <p className="flex justify-center items-center h-screen font-bold text-3xl mt-10">
        Loading...
      </p>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-l from-black to-gray-500 flex flex-col justify-center text-white p-10">
      <button
        onClick={() => navigate(-1)}
        className="active:scale-95 hover:scale-115 transition-all duration-200 absolute top-20 right-100 text-4xl"
      >
        <i className="ri-close-line"></i>
      </button>

      <div className="max-w-6xl mx-100 flex gap-50">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-80 shadow-gray-950 rounded-xl"
        />

        <div className="flex flex-col gap-10">
          <h1 className="text-4xl font-bold mb-4">
            {movie.title}
          </h1>
          <p className="text-gray-300 mb-4">
            {movie.overview}
          </p>
          <p>⭐ Rating: {movie.vote_average}</p>
          <p>📅 Release: {movie.release_date}</p>

          {trailerKey && (
            <button
              onClick={() =>
                window.open(
                  `https://www.youtube.com/watch?v=${trailerKey}`,
                  "_blank"
                )
              }
              className="bg-blue-500 w-35 py-3 rounded-2xl active:scale-55 hover:scale-115 transition-all duration-300 shadow-2xl"
            >
              Watch Now <i class="ri-play-large-line"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Moviepage;