import { NavLink, Outlet } from 'react-router-dom';
import Favorite from '../../assets/icons/Favorite';
import Profile from '../../assets/icons/Settings';
import styles from './Account.module.css';

const Account = () => {
  return (
    <>
      <section className={styles.account}>
        <div className={'container'}>
          <h2 className={`${styles.title} sectionTitle`}>Мой аккаунт</h2>
          <nav aria-label="Навигация по аккаунту" className={styles.linkGroup}>
            <NavLink
              aria-label="Перейти в избранное"
              to="/account/favorites"
              className={({ isActive }: { isActive: boolean }) =>
                `${styles.link} ${isActive ? styles.linkActive : styles.linkNotActive}`
              }
            >
              <Favorite />
              <span className={styles.btnName}>Избранное</span>
            </NavLink>
            <NavLink
              aria-label="Перейти в настройки"
              to="/account/settings"
              className={({ isActive }: { isActive: boolean }) =>
                `${styles.link} ${isActive ? styles.linkActive : styles.linkNotActive}`
              }
            >
              <Profile />
              <span className={styles.btnName}>Настройки</span>
            </NavLink>
          </nav>
        </div>
      </section>
      <Outlet />
    </>
  );
};

export default Account;
