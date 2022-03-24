import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const dummyMovies = [
    {
      id: 1,
      title: "Some Dummy Movie",
      openingText: "This is the opening text of the movie",
      releaseDate: "2021-05-18",
    },
    {
      id: 2,
      title: "Some Dummy Movie 2",
      openingText: "This is the second opening text of the movie",
      releaseDate: "2021-05-19",
    },
  ];
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const movieFetchHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.py4e.com/api/films/");
      if (!response.ok) throw new Error("Something Went Wrong!");
      const data = await response.json();
      const transformedMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (e) {
      setError(e.message);
    }

    setIsLoading(false);
  });
  useEffect(() => {
    movieFetchHandler();
  }, [movieFetchHandler]);
  let content = <p>No Movies Found</p>;
  if (movies.length > 0) content = <MoviesList movies={movies} />;
  if (error) content = <p>{error}</p>;
  if (isLoading) content = <p>Loading...</p>;

  return (
    <React.Fragment>
      <section>
        <button onClick={movieFetchHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
