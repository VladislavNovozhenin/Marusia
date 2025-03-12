import { Movie } from "../../types";
import styles from "./MovieInfo.module.css";

interface IMovieInfo {
  movie: Movie;
}

const MovieInfo = ({ movie }: IMovieInfo) => {
  return (
    <section className={styles.movieInfo}>
      <div className={`${styles.container} container`}>
        <h2 className={`${styles.title} sectionTitle`}>О фильме</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <div className={styles.itemLabel}>
              <span className={styles.itemKey}>Язык оригинала</span>
              <span className={styles.itemBorder}></span>
            </div>
            <span className={styles.itemValue}>
              {movie.language ? movie.language : "Нет данных"}
            </span>
          </li>
          <li className={styles.item}>
            <div className={styles.itemLabel}>
              <span className={styles.itemKey}>Бюджет</span>
              <span className={styles.itemBorder}></span>
            </div>
            <span className={styles.itemValue}>
              {movie.budget ? movie.budget : "Нет данных"}
            </span>
          </li>
          <li className={styles.item}>
            <div className={styles.itemLabel}>
              <span className={styles.itemKey}>Выручка</span>
              <span className={styles.itemBorder}></span>
            </div>
            <span className={styles.itemValue}>
              {movie.cast.length ? movie.cast : "Нет данных"}
            </span>
          </li>
          <li className={styles.item}>
            <div className={styles.itemLabel}>
              <span className={styles.itemKey}>Режиссёр</span>
              <span className={styles.itemBorder}></span>
            </div>
            <span className={styles.itemValue}>
              {movie.director ? movie.director : "Нет данных"}
            </span>
          </li>
          <li className={styles.item}>
            <div className={styles.itemLabel}>
              <span className={styles.itemKey}>Продакшен</span>
              <span className={styles.itemBorder}></span>
            </div>
            <span className={styles.itemValue}>
              {movie.production ? movie.production : "Нет данных"}
            </span>
          </li>
          <li className={styles.item}>
            <div className={styles.itemLabel}>
              <span className={styles.itemKey}>Награды</span>
              <span className={styles.itemBorder}></span>
            </div>
            <span className={styles.itemValue}>
              {movie.awardsSummary ? movie.awardsSummary : "Нет данных"}
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default MovieInfo;
