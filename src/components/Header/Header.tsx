import styles from "./Header.module.css";
import HeaderIcons from "../HeaderIcons/HeaderIcons";
import logo from "../../img/headerLogo.png";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import ToBack from "../../img/ToBack";
import HeaderSearch from "../HeaderSearch/HeaderSearch";
import { useAppSelector } from "../../store/hooks";

interface IHeader {
  setIsOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setIsOpenLogin }: IHeader) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        {isSearchVisible && (
          <button onClick={toggleSearch} className={styles.btnToBack}>
            <ToBack />
          </button>
        )}
        {!isSearchVisible && (
          <NavLink to={"/"} className={styles.logoLink}>
            <img src={logo} alt="Логотип" />
          </NavLink>
        )}
        <nav className={styles.nav}>
          <NavLink
            to={"/"}
            className={({ isActive }: { isActive: boolean }) =>
              `${styles.navLink} ${
                isActive ? styles.navLinkActive : styles.navLinkNotActive
              }`
            }
          >
            Главная
          </NavLink>
          <NavLink
            to={"/genres"}
            className={({ isActive }: { isActive: boolean }) =>
              `${styles.navLink} ${
                isActive ? styles.navLinkActive : styles.navLinkNotActive
              }`
            }
          >
            Жанры
          </NavLink>
        </nav>
        <HeaderSearch
          isSearchVisible={isSearchVisible}
          setIsSearchVisible={setIsSearchVisible}
        />
        {user ? (
          <NavLink
            to={"/account"}
            className={({ isActive }: { isActive: boolean }) =>
              `${styles.navLink} ${styles.navLinkAuth} ${
                isActive ? styles.navLinkActive : styles.navLinkNotActive
              }`
            }
          >
            {user.name}
          </NavLink>
        ) : (
          <button onClick={() => setIsOpenLogin(true)} className={styles.btn}>
            Войти
          </button>
        )}
        {!isSearchVisible && (
          <HeaderIcons
            setIsOpenLogin={setIsOpenLogin}
            toggleSearch={toggleSearch}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
