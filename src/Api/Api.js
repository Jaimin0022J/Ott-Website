const API_KEY = "435cfbd8a60ad630664daddfec1e546e";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies() {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;
}

export async function searchMovies(query) {
  if (!query) return [];
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const data = await res.json();
  return data.results;
}