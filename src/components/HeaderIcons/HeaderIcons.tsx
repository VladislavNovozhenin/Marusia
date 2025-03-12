import { NavLink, useNavigate } from "react-router-dom";
import HeaderGenres from "../../img/HeaderGenres";
import HeaderProfile from "../../img/HeaderProfile";
import HeaderSearch from "../../img/HeaderSearchIcon";
import styles from "./HeaderIcons.module.css";
import { useAppSelector } from "../../store/hooks";

interface IHeaderIcons {
  toggleSearch: () => void;
  setIsOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderIcons = ({ toggleSearch, setIsOpenLogin }: IHeaderIcons) => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const handleLoginOrProfile = () => {
    if (user) {
      navigate("/account");
    } else {
      setIsOpenLogin(true);
    }
  };
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink to={"/genres"} className={styles.link}>
            <HeaderGenres />
          </NavLink>
        </li>
        <li onClick={toggleSearch} className={styles.item}>
          <a className={styles.link}>
            <HeaderSearch />
          </a>
        </li>
        <li onClick={handleLoginOrProfile} className={styles.item}>
          <a className={styles.link}>
            <HeaderProfile />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderIcons;
