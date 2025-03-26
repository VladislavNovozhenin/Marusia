import MovieCard from '../../components/MovieCard/MovieCard';
import TopMovies from '../../components/TopMovies/TopMovies';
import { useFetchRandomQuery } from '../../services/movieService';

const Home = () => {
  const { data: movieRandom, refetch } = useFetchRandomQuery();
  return (
    <>
      {movieRandom && <MovieCard movie={movieRandom} refetch={refetch} />}
      <TopMovies />
    </>
  );
};

export default Home;
