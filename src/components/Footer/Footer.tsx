import FooterOk from "../../img/FooterOk";
import FooterTg from "../../img/FooterTg";
import FooterVk from "../../img/FooterVk";
import FooterYoutube from "../../img/FooterYoutube";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className="container">
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <a href="">
                <FooterVk />
              </a>
            </li>
            <li className={styles.item}>
              <a href="">
                <FooterYoutube />
              </a>
            </li>
            <li className={styles.item}>
              <a href="">
                <FooterOk />
              </a>
            </li>
            <li className={styles.item}>
              <a href="">
                <FooterTg />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Footer;
