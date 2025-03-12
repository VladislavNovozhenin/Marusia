import { useNavigate } from "react-router-dom";
import Like from "../../img/MovieCardLike";
import Update from "../../img/MovieCardUpdate";
import { Movie } from "../../types";
import styles from "./MovieCard.module.css";
import { useState } from "react";
import MovieTrailerModal from "../MovieTrailerModal/MovieTrailerModal";
import MovieCardInfo from "../MovieCardInfo/MovieCardInfo";
import { useAppDispatch } from "../../store/hooks";
import { fetchPostFavorites } from "../../request";

interface IMovie {
  movie: Movie;
  fetchNewRandomMovie?: () => void;
}

const MovieCard = ({ movie, fetchNewRandomMovie }: IMovie) => {
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleGoToMoviePage = (id: number) => {
    navigate(`movie/${id}`);
  };
  return (
    <section className={styles.movieCard}>
      <div className={`${styles.container} container`}>
        <div className={styles.img}>
          <img src={movie.posterUrl} alt="Обложка" />
        </div>

        <div className={styles.content}>
          <MovieCardInfo movie={movie} />
          <h2 className={`${styles.title} sectionTitle`}>{movie.title}</h2>
          <p className={styles.descr}>{movie.plot}</p>
          <div
            className={`${styles.actions} ${
              fetchNewRandomMovie ? "" : styles.actionsAboutFilm
            }`}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className={`${styles.btn} ${styles.btnTreler} btnPrimary ${
                fetchNewRandomMovie ? "" : styles.btnTrelerAboutFilm
              }`}
            >
              Трейлер
            </button>
            <div
              className={`${styles.btnGroup} ${
                fetchNewRandomMovie ? "" : styles.btnGroupAboutFilm
              }`}
            >
              <button onClick={() => dispatch(fetchPostFavorites(movie.id))} className={`${styles.btn} ${styles.btnLike} btnPrimary`}>
                <Like />
              </button>

              {fetchNewRandomMovie && (
                <>
                  <button
                    onClick={() => handleGoToMoviePage(movie.id)}
                    className={` ${styles.btn} ${styles.btnFilm} btnPrimary`}
                  >
                    О фильме
                  </button>
                  <button
                    onClick={fetchNewRandomMovie}
                    className={`${styles.btn} btnPrimary`}
                  >
                    <Update />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {isModalOpen && (
          <MovieTrailerModal
            movie={movie}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </section>
  );
};

export default MovieCard;
