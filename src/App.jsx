import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Favorite from "./Pages/Favorite";
import Moviepage from "./Pages/Moviepage";

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorite = (movie) => {
    if (!favorites.find((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorite = (id) => {
    setFavorites(favorites.filter((movie) => movie.id !== id));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Home addToFavorite={addToFavorite} favorites={favorites} />}
      />
      <Route
        path="/favorite"
        element={
          <Favorite
            favorites={favorites}
            removeFromFavorite={removeFromFavorite}
          />
        }
      />
      <Route path="/movie/:id" element={<Moviepage />} />
    </Routes>
  );
};

export default App;
