import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGetMovie } from "../../request";
import { Movie } from "../../types";
import MovieCard from "../../components/MovieCard/MovieCard";
import MovieInfo from "../../components/MovieInfo/MovieInfo";

const MoviePage = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      fetchGetMovie(id).then((result) => setMovie(result));
    }
  }, [id]);

  return (
    <>
      {movie && (
        <>
          <MovieCard movie={movie} />
          <MovieInfo movie={movie} />
        </>
      )}
    </>
  );
};

export default MoviePage;
