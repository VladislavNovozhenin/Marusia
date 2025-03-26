import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Like from '../../assets/icons/MovieCardLike';
import Update from '../../assets/icons/MovieCardUpdate';
import { Movie } from '../../types';
import MovieTrailerModal from '../MovieTrailerModal/MovieTrailerModal';
import MovieCardInfo from '../MovieCardInfo/MovieCardInfo';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useGetFavoriteQuery,
} from '../../services/favoriteService';
import { openModal } from '../../store/modalSlice';
import LikeFav from '../../assets/icons/MovieCardLikeFav';
import styles from './MovieCard.module.css';

interface IMovie {
  movie: Movie;
  refetch?: () => void;
}

const MovieCard = ({ movie, refetch }: IMovie) => {
  const dispatch = useAppDispatch();
  const [fetchAdd] = useAddFavoriteMutation();
  const [fetchDelete] = useDeleteFavoriteMutation();

  const user = useAppSelector((state) => state.user.user);
  const { data: favorites } = useGetFavoriteQuery(undefined, { skip: !user });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFavorite = favorites?.some((favorite) => favorite.id === movie.id);

  const handleDelete = async (id: number) => {
    const result = await fetchDelete(id);
    if (result.data) {
      toast.success('The movie was successfully deleted from favorites', {
        theme: 'colored',
      });
    }
  };

  const handleAdd = async (id: number) => {
    if (user) {
      const result = await fetchAdd(id);
      if (result.data) {
        toast.success('The movie was successfully added to favorites', {
          theme: 'colored',
        });
      }
    } else {
      dispatch(openModal('login'));
    }
  };
  return (
    <section className={styles.movieCard}>
      <div className={`${styles.container} container`}>
        <figure className={styles.img}>
          <img src={movie.posterUrl} alt={`Постер фильма ${movie.title}`} />
        </figure>

        <div className={styles.content}>
          <MovieCardInfo movie={movie} />
          <h2 className={`${styles.title} sectionTitle`}>{movie.title}</h2>
          <p className={styles.descr}>{movie.plot}</p>
          <div className={`${styles.actions} ${refetch ? '' : styles.actionsAboutFilm}`}>
            <button
              onClick={() => setIsModalOpen(true)}
              className={`${styles.btn} ${styles.btnTreler} button btnSecondary ${
                refetch ? '' : styles.btnTrelerAboutFilm
              }`}
              aria-label={`Открыть трейлер фильма ${movie.title}`}
            >
              Трейлер
            </button>
            <div className={`${styles.btnGroup} button ${refetch ? '' : styles.btnGroupAboutFilm}`}>
              {isFavorite ? (
                <button
                  className={`${styles.btn} ${styles.btnLike} button btnPrimary ${styles.btnLikeFav}`}
                  onClick={() => handleDelete(movie.id)}
                  aria-label={`Удалить фильм ${movie.title} из избранного`}
                >
                  <LikeFav />
                </button>
              ) : (
                <button
                  onClick={() => handleAdd(movie.id)}
                  className={`${styles.btn} ${styles.btnLike} button btnPrimary`}
                  aria-label={`Добавить фильм ${movie.title} в избранное `}
                >
                  <Like />
                </button>
              )}

              {refetch && (
                <>
                  <NavLink
                    to={`movie/${movie.id}`}
                    className={` ${styles.btn} ${styles.btnFilm} button btnPrimary`}
                    aria-label="Перейти к фильму"
                  >
                    О фильме
                  </NavLink>
                  <button
                    onClick={refetch}
                    className={`${styles.btn} button btnPrimary`}
                    aria-label="Обновить фильм"
                  >
                    <Update />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {isModalOpen && <MovieTrailerModal movie={movie} onClose={() => setIsModalOpen(false)} />}
      </div>
    </section>
  );
};

export default MovieCard;
