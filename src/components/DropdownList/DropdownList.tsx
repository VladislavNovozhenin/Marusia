import { Link } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import { useAppSelector } from "../../store/hooks";
import MovieCardInfo from "../MovieCardInfo/MovieCardInfo";
import styles from "./DropdownList.module.css";
import { useEffect, useRef } from "react";

interface IDropdownList {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setIsSearchVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownList = ({
  inputValue,
  setInputValue,
  setIsSearchVisible,
}: IDropdownList) => {
  const movies = useAppSelector((state) => state.movies.movies);
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [] )
  const filterMovies = movies
    .filter((movie) => {
      return movie.title.toLocaleLowerCase().includes(inputValue.toLowerCase());
    })
    .slice(0, 5);

  const handleClose = () => {
    setIsSearchVisible(false);
    setInputValue("");
  };

   const handleClickOutside = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target as Node) && (e.target as HTMLInputElement).tagName !== "INPUT") {
      setIsSearchVisible(false);
      setInputValue("");
    }
     
   };

  return (
    <div ref={ref} className={styles.container}>
      {filterMovies.length ? (
        <>
          <Swiper
            className={styles.swiper}
            slidesPerView={1.27}
            spaceBetween={16}
            loop={false}
            breakpoints={{
              576: {
                slidesPerView: 1.4,
              },
              768: {
                slidesPerView: 1.6,
              },
            }}
          >
            {filterMovies.map((movie, index) => {
              return (
                <SwiperSlide key={index} className={styles.swiperSlide}>
                  <Link className={styles.link} onClick={handleClose} to={`/movie/${movie.id}`}>
                    <div className={styles.img}>
                      <img src={movie.posterUrl} alt="Обложка" />
                    </div>
                    <div>
                      <MovieCardInfo dropdown={true} movie={movie} />
                      <p className={styles.descr}>{movie.title}</p>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <ul className={styles.list}>
            {filterMovies.map((movie, index) => {
              return (
                <li key={index} className={styles.item}>
                  <Link
                    className={styles.link}
                    onClick={handleClose}
                    to={`/movie/${movie.id}`}
                  >
                    <div className={styles.img}>
                      <img src={movie.posterUrl} alt="Обложка" />
                    </div>
                    <div>
                      <MovieCardInfo dropdown={true} movie={movie} />
                      <p className={styles.descr}>{movie.title}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className={styles.notFound}>
          По вашему запросу ничего не найдено...{" "}
        </p>
      )}
    </div>
  );
};

export default DropdownList;
