import React from 'react';
import { Link } from 'react-router-dom';
import { SwiperSlide, Swiper } from 'swiper/react';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import { Movie } from '../../types';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import OnClose from '../../assets/icons/OnClose';
import { useDeleteFavoriteMutation } from '../../services/favoriteService';
import styles from './MoviesCarousel.module.css';

interface IMoviesCarousel {
  title?: string;
  movies: Movie[] | undefined;
  className?: string;
  isDelete?: boolean;
  top?: boolean;
  fetchDelete?: ReturnType<typeof useDeleteFavoriteMutation>[0];
}

const MoviesCarousel = ({
  title,
  movies,
  className,
  isDelete,
  top,
  fetchDelete,
}: IMoviesCarousel) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const handleDelete = async (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (fetchDelete) {
      const result = await fetchDelete(id);
      if (result.data) {
        toast.success('The movie was successfully deleted from favorites', {
          theme: 'colored',
        });
      }
    }
  };
  return (
    <section className={`${styles.movie} ${className || ''}`}>
      <div className="container">
        {title && <h2 className={`${styles.title} sectionTitle`}>{title}</h2>}
        {isMobile ? (
          <Swiper
            className={styles.swiper}
            slidesPerView={1.5}
            spaceBetween={40}
            loop={false}
            breakpoints={{
              576: {
                slidesPerView: 2,
              },
            }}
          >
            {movies &&
              movies.map((movie, index) => (
                <SwiperSlide key={movie.id} className={styles.swiperSlide}>
                  <Link
                    className={styles.link}
                    to={`/movie/${movie.id}`}
                    aria-label={`Перейти к фильму ${movie.title}`}
                  >
                    <img src={movie.posterUrl} alt={`Постер фильма ${movie.title}`} />
                    {top && <div className={styles.swiperSlideNumber}>{index + 1}</div>}
                    {isDelete && (
                      <button
                        className={styles.btnDelete}
                        onClick={(e) => handleDelete(movie.id, e)}
                        aria-label={`Удалить фильм ${movie.title} из избранного`}
                      >
                        <OnClose />
                      </button>
                    )}
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        ) : (
          <ul className={styles.list}>
            {movies &&
              movies.map((movie, index) => (
                <li key={movie.id} className={styles.swiperSlide}>
                  <Link
                    className={styles.link}
                    to={`/movie/${movie.id}`}
                    aria-label={`Перейти к фильму ${movie.title}`}
                  >
                    <img src={movie.posterUrl} alt="Постер" />
                    {top && <div className={styles.swiperSlideNumber}>{index + 1}</div>}
                    {isDelete && (
                      <button
                        className={styles.btnDelete}
                        onClick={(e) => handleDelete(movie.id, e)}
                        aria-label={`Удалить фильм ${movie.title} из избранного`}
                      >
                        <OnClose />
                      </button>
                    )}
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default MoviesCarousel;
