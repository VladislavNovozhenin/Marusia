import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchRandom } from "../../request";
import { Movie } from "../../types";
import TopMovies from "../../components/TopMovies/TopMovies";

const Home = () => {
  const [movieRandom, setMovieRandom] = useState<Movie | null>(null);

  const fetchNewRandomMovie = () => {
    fetchRandom().then((result) => setMovieRandom(result));
  };

  useEffect(() => {
    fetchNewRandomMovie();
  }, []);
  return (
    <>
      {movieRandom && (
        <MovieCard
          movie={movieRandom}
          fetchNewRandomMovie={fetchNewRandomMovie}
        />
      )}
      <TopMovies />
    </>
  );
};

export default Home;
