import { useEffect} from "react";
import styles from "./Genres.module.css";
import { fetchGetGenres } from "../../request";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
const images = require.context("../../img/genres", false, /\.(png|jpe?g|svg)$/);
const Genres = () => {
  const genres = useAppSelector(state => state.genres.genres)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (!genres?.length) {
       dispatch(fetchGetGenres());
    }
   
  }, []);

  const handleClick = (data: string) => {
    navigate(`/${data}`)
  }

  return (
    <section className={styles.genres}>
      <div className={`${styles.container} container`}>
        <h2 className={`${styles.title} sectionTitle`}>Жанры фильмов</h2>
        <ul className={styles.list}>
          {genres?.map((genre, index) => {
            const imgUrl = images(`./${genre}.jpg`);
            return (
              <li onClick={() => handleClick(genre)} className={styles.item} key={index}>
                <img src={imgUrl} alt="" />
                <div className={styles.itemDescr}>{genre}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Genres;
