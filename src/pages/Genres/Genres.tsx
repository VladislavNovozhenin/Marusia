import { Link } from 'react-router-dom';
import { useFetchGetGenresQuery } from '../../services/movieService';
import styles from './Genres.module.css';

const images = require.context('../../assets/img/genres', false, /\.(png|jpe?g|svg)$/);
const Genres = () => {
  const { data: genres } = useFetchGetGenresQuery();

  return (
    <section className={styles.genres} aria-labelledby="genres-title">
      <div className={`${styles.container} container`}>
        <h2 id="genres-title" className={`${styles.title} sectionTitle`}>
          Жанры фильмов
        </h2>
        <ul className={styles.list}>
          {genres?.map((genre, index) => {
            const imgUrl = images(`./${genre}.jpg`);
            return (
              <li className={styles.item} key={index}>
                <Link className={styles.link} to={`/${genre}`}>
                  <img src={imgUrl} alt={`Жанр ${genre}`} />
                  <div className={styles.itemDescr}>{genre}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Genres;
