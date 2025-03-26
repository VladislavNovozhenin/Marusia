import { NavLink, useNavigate } from 'react-router-dom';
import HeaderGenres from '../../assets/icons/HeaderGenres';
import HeaderProfile from '../../assets/icons/HeaderProfile';
import HeaderSearch from '../../assets/icons/HeaderSearchIcon';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { openModal } from '../../store/modalSlice';
import styles from './HeaderIcons.module.css';

interface IHeaderIcons {
  toggleSearch: () => void;
}

const HeaderIcons = ({ toggleSearch }: IHeaderIcons) => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const handleLoginOrProfile = () => {
    if (user) {
      navigate('/account');
    } else {
      dispatch(openModal('login'));
    }
  };
  return (
    <nav className={styles.nav} role="navigation" aria-label="Меню">
      <ul role="menu" className={styles.list}>
        <li role="menuitem" className={styles.item}>
          <NavLink to={'/genres'} className={styles.link} aria-label="Жанры">
            <HeaderGenres />
          </NavLink>
        </li>
        <li role="menuitem" className={styles.item}>
          <button onClick={toggleSearch} className={styles.link} aria-label="Поиск">
            <HeaderSearch />
          </button>
        </li>
        <li role="menuitem" className={styles.item}>
          <button
            onClick={handleLoginOrProfile}
            className={styles.link}
            aria-label={user ? 'Профиль' : 'Вход'}
          >
            <HeaderProfile />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderIcons;
