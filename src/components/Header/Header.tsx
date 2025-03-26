import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import HeaderIcons from '../HeaderIcons/HeaderIcons';
import logo from '../../assets/img/headerLogo.png';
import ToBack from '../../assets/icons/ToBack';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { openModal } from '../../store/modalSlice';
import styles from './Header.module.css';

const Header = () => {
  const dispatch = useAppDispatch();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        {isSearchVisible && (
          <button
            onClick={toggleSearch}
            className={`${styles.btnToBack} button`}
            aria-label="Закрыть поиск"
          >
            <ToBack aria-hidden="true" />
          </button>
        )}
        {!isSearchVisible && (
          <NavLink to={'/'} className={styles.logoLink} aria-label="Перейти на главную">
            <img src={logo} alt="Маруся – главная страница" />
          </NavLink>
        )}
        <nav className={styles.nav} aria-label="Главная навигация">
          <NavLink
            aria-label="Перейти на главную страницу"
            to={'/'}
            className={({ isActive }: { isActive: boolean }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : styles.navLinkNotActive}`
            }
          >
            Главная
          </NavLink>
          <NavLink
            aria-label="Перейти к жанрам"
            to={'/genres'}
            className={({ isActive }: { isActive: boolean }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : styles.navLinkNotActive}`
            }
          >
            Жанры
          </NavLink>
        </nav>
        <HeaderSearch isSearchVisible={isSearchVisible} setIsSearchVisible={setIsSearchVisible} />
        {user ? (
          <NavLink
            to={'/account'}
            className={({ isActive }: { isActive: boolean }) =>
              `${styles.navLink} ${styles.navLinkAuth} ${
                isActive ? styles.navLinkActive : styles.navLinkNotActive
              }`
            }
          >
            {user.name}
          </NavLink>
        ) : (
          <button
            aria-label="Войти в аккаунт"
            onClick={() => dispatch(openModal('login'))}
            className={styles.btn}
          >
            Войти
          </button>
        )}
        {!isSearchVisible && <HeaderIcons toggleSearch={toggleSearch} />}
      </div>
    </header>
  );
};

export default Header;
