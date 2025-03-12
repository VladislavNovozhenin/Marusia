import Rating from "../../img/MovieCardRating";
import { Movie } from "../../types";
import { formatTime } from "../../utils";
import styles from "./MovieCardInfo.module.css";

interface IMovieCardInfo {
  movie: Movie;
  dropdown?: boolean;
}

const MovieCardInfo = ({ movie, dropdown }: IMovieCardInfo) => {
  return (
    <div
      className={`${styles.movieCardInfo} ${
        dropdown ? styles.dropdownMovieCardInfo : ""
      }`}
    >
      <div
        className={`${styles.rating} ${dropdown ? styles.dropdownRating : ""} ${
          movie.tmdbRating < 5
            ? styles.ratingRed
            : movie.tmdbRating < 7
            ? styles.ratingGrey
            : movie.tmdbRating < 8
            ? styles.ratingGreen
            : ""
        }`}
      >
        <Rating />
        {movie.tmdbRating}
      </div>
      <span className={`${styles.year} ${dropdown ? styles.dropdownYear : ""}`}>
        {movie.releaseYear}
      </span>
      {movie.genres.map((genre, index) => {
        return (
          <span
            key={index}
            className={`${styles.genre} ${
              dropdown ? styles.dropdownGenre : ""
            }`}
          >
            {genre}
          </span>
        );
      })}

      <span
        className={`${styles.duration} ${
          dropdown ? styles.dropdownDuration : ""
        }`}
      >
        {formatTime(movie.runtime)}
      </span>
    </div>
  );
};

export default MovieCardInfo;
