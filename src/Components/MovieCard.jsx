import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

export default function MovieCard({
  movie,
  onFavorite,
  isFavorite,
  onRemove,
}) {
  const navigate = useNavigate(); 

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div
      
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="relative bg-gradient-to-tl from-gray-500 to-gray-50 rounded-2xl shadow-2xl cursor-pointer overflow-hidden hover:scale-105 transition-all duration-300"
    >
     
      <button
        onClick={(e) => {
          e.stopPropagation(); 
          isFavorite
            ? onRemove(movie.id)
            : onFavorite(movie);
        }}
        className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-4xl
        ${isFavorite ? "text-red-500" : "text-black"}`}
      >
        <i
          className={
            isFavorite ? "ri-heart-fill" : "ri-heart-line"
          }
        ></i>
      </button>

      <img
        src={poster}
        alt={movie.title}
        className="w-full object-cover"
      />

      <div className="p-3 text-center">
        <h3 className="font-bold text-xl">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-600 font-semibold">
          {movie.release_date?.split("-")[0]}
        </p>
      </div>
    </div>
  );
}