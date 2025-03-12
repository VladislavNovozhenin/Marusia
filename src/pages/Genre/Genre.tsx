import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Movie } from "../../types";
import styles from "./Genre.module.css";
import ToBack from "../../img/ToBack";
import { useAppSelector } from "../../store/hooks";

const Genre = () => {
  const movies = useAppSelector((state) => state.movies.movies);
  const [filterMovie, setFilterMovie] = useState<Movie[]>([]);
  const [visibleMovie, setVisibleMovie] = useState(5);
  const { genre } = useParams();
  const navigate = useNavigate();
  const screenWidth = window.innerWidth;

  useEffect(() => {
    if (screenWidth < 1024) {
      setVisibleMovie(5);
    } else {
      setVisibleMovie(15);
    }
  }, []);

  useEffect(() => {
    if (movies.length && genre) {
      setFilterMovie(movies.filter((movie) => movie.genres.includes(genre)));
    }
  }, [movies, genre]);

  const handleToBackPage = () => {
    navigate(-1);
  };

  const handleGoToMoviePage = (id: number) => {
    navigate(`/movie/${id}`);
  };

  const loadMore = () => {
    if (screenWidth < 1024) {
      setVisibleMovie((prev) => prev + 5);
    } else {
      setVisibleMovie((prev) => prev + 15);
    }
  };

  const displayedMovie = filterMovie.slice(0, visibleMovie);
  return (
    <section className={styles.genre}>
      <div className={`${styles.container} container`}>
        <div className={styles.content}>
          <button onClick={handleToBackPage} className={styles.btnBack}>
            <ToBack />
          </button>
          <h2 className={`${styles.title} sectionTitle`}>{genre}</h2>
        </div>
        <ul className={styles.list}>
          {displayedMovie.map((movie) => {
            return (
              <li
                onClick={() => handleGoToMoviePage(movie.id)}
                className={styles.item}
                key={movie.id}
              >
                <img src={movie.posterUrl} alt={movie.title} />
              </li>
            );
          })}
        </ul>
        {visibleMovie < filterMovie.length && (
          <button onClick={loadMore} className={styles.btnShow}>
            Показать еще
          </button>
        )}
      </div>
    </section>
  );
};

export default Genre;
