import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import ToBack from '../../assets/icons/ToBack';
import { useFetchAllMovieQuery } from '../../services/movieService';
import styles from './Genre.module.css';

const Genre = () => {
  const { data: movies } = useFetchAllMovieQuery();
  const [visibleMovie, setVisibleMovie] = useState(5);
  const { genre } = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const firstNewMovieRef = useRef<HTMLAnchorElement | null>(null);
  const prevVisibleMovies = useRef(visibleMovie);

  useEffect(() => {
    if (isMobile) {
      setVisibleMovie(5);
    } else {
      setVisibleMovie(15);
    }
  }, [isMobile]);

  useEffect(() => {
    if (prevVisibleMovies.current < visibleMovie) {
      setTimeout(() => {
        if (firstNewMovieRef.current) {
          firstNewMovieRef.current.focus();
        }
      }, 100);
    }
  }, [visibleMovie]);

  const filteredMovie = useMemo(() => {
    if (movies && movies.length && genre) {
      return movies.filter((movie) => movie.genres.includes(genre));
    } else return [];
  }, [movies, genre]);

  const handleToBackPage = () => {
    navigate(-1);
  };

  const loadMore = () => {
    const newVisibleCount = visibleMovie + (isMobile ? 5 : 15);
    prevVisibleMovies.current = visibleMovie;
    setVisibleMovie(newVisibleCount);
  };

  const displayedMovie = filteredMovie.slice(0, visibleMovie);
  return (
    <section className={styles.genre}>
      <div className={'container'}>
        <div className={styles.content}>
          <button onClick={handleToBackPage} className={`${styles.btnBack} button`}>
            <ToBack />
          </button>
          <h2 className={'sectionTitle'}>{genre}</h2>
        </div>
        <ul className={styles.list}>
          {displayedMovie.map((movie, index) => {
            const isFirstNew = index === prevVisibleMovies.current;
            return (
              <li className={styles.item} key={movie.id}>
                <Link
                  ref={isFirstNew ? firstNewMovieRef : null}
                  className={styles.link}
                  to={`/movie/${movie.id}`}
                >
                  <img src={movie.posterUrl} alt={`Фильм ${movie.title}`} />
                </Link>
              </li>
            );
          })}
        </ul>
        {visibleMovie < filteredMovie.length && (
          <button onClick={loadMore} className={`${styles.btnShow} button`}>
            Показать еще
          </button>
        )}
      </div>
    </section>
  );
};

export default Genre;
