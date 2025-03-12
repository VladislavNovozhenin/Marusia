import { useEffect, useState } from "react";
import { Movie } from "../../types";
import { fetchTopMovies } from "../../request";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";
import { Grid } from "swiper/modules";
import styles from "./TopMovies.module.css";
import { Link } from "react-router-dom";

const TopMovies = () => {
  const [topMovies, setTopMovies] = useState<Movie[] | null>(null);

  useEffect(() => {
    fetchTopMovies().then((result) => setTopMovies(result));
  }, []);

  return (
    <section className={styles.topMovie}>
      <div className="container">
        <h2 className={`${styles.title} sectionTitle`}>Топ 10 фильмов</h2>

        <Swiper
          className={styles.swiper}
          slidesPerView={1.5}
          spaceBetween={40}
          loop={false}
          modules={[Grid]}
          breakpoints={{
            576: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 5,
              grid: { rows: 2, fill: "row" },
            },
          }}
        >
          {topMovies &&
            topMovies.map((movie, index) => {
              return (
                <SwiperSlide key={index} className={styles.swiperSlide}>
                  <Link to={`./movie/${movie.id}`}>
                    <img src={movie.posterUrl} alt="Постер" />
                    <div className={styles.swiperSlideNumber}>{index + 1}</div>
                  </Link>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </section>
  );
};

export default TopMovies;
