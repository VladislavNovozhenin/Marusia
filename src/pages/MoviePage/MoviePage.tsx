import { useParams } from 'react-router-dom';

import MovieCard from '../../components/MovieCard/MovieCard';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import { useFetchGetMovieQuery } from '../../services/movieService';

const MoviePage = () => {
  const { id } = useParams();
  const { data: movie } = useFetchGetMovieQuery(id!);

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
