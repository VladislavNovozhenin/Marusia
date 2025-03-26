import { useNavigate } from 'react-router-dom';
import Email from '../../assets/icons/Mail';
import { useLazyLogoutQuery, useProfileQuery } from '../../services/authService';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/userSlice';
import styles from './Settings.module.css';

const Settings = () => {
  const { data: user } = useProfileQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [fetchLogout] = useLazyLogoutQuery();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('auth');
    fetchLogout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <section className={styles.settings}>
      <div className={`${styles.container} container`}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <div className={styles.icon}>{user?.name[0] + user.surname[0]}</div>
            <div className={styles.content}>
              <span className={styles.label}>Имя Фамилия</span>
              <span className={styles.data}>{user?.name + ' ' + user?.surname}</span>
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.icon}>
              <Email />
            </div>
            <div className={styles.content}>
              <span className={styles.label}>Электронная почта</span>
              <span className={styles.data}>{user.email}</span>
            </div>
          </li>
        </ul>
        <button
          aria-label="Выйти из аккаунта"
          onClick={() => handleLogout()}
          className={`${styles.btn} button btnSecondary`}
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
};

export default Settings;
