import { useFetchTopMoviesQuery } from '../../services/movieService';
import MoviesCarousel from '../MoviesCarousel/MoviesCarousel';

const TopMovies = () => {
  const { data: topMovies } = useFetchTopMoviesQuery();

  return <MoviesCarousel movies={topMovies} title="Топ 10 фильмов" top={true} />;
};

export default TopMovies;
