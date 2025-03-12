import { NavLink, Outlet } from "react-router-dom";
import Favorite from "../../img/Favorite";
import Profile from "../../img/Settings";
import styles from "./Account.module.css";

const Account = () => {
  return (
    <section className={styles.account}>
      <div className={"container"}>
        <h2 className={`${styles.title} sectionTitle`}>Мой аккаунт</h2>
        <div className={styles.linkGroup}>
          <NavLink to='/account/favorites' className={styles.link}>
            <Favorite />
            <span className={styles.btnName}>Избранное</span>
          </NavLink>
          <NavLink to='/account/settings' className={styles.link}>
            <Profile />
            <span className={styles.btnName}>Настройки</span>
          </NavLink>
        </div>
        <Outlet />
      </div>
    </section>
  );
};

export default Account;
