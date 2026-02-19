import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "../Components/MovieCard";

const Favorite = ({ favorites, removeFromFavorite }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-500 to-white p-10">
      
      <Link
        to="/"
        className="ml-218 px-4 py-2 active:scale-95 hover:scale-105 transition-all duration-300 bg-gray-100 shadow-2xl font-medium rounded-xl text-xl inline-block mb-6"
      >
        Home <i class="ri-home-wifi-fill"></i>
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-center">
        Favorite Movies
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center mt-70 font-bold text-2xl">No favorite movies yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={true}
              onRemove={removeFromFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;