import MoviesCarousel from '../../components/MoviesCarousel/MoviesCarousel';
import { useDeleteFavoriteMutation, useGetFavoriteQuery } from '../../services/favoriteService';
import styles from './Favorites.module.css';

const Favorites = () => {
  const { data: favorites } = useGetFavoriteQuery();
  const [fetchDelete] = useDeleteFavoriteMutation();
  return (
    <MoviesCarousel
      className={styles.pb}
      movies={favorites}
      isDelete={true}
      fetchDelete={fetchDelete}
    />
  );
};

export default Favorites;
