import FooterOk from '../../assets/icons/FooterOk';
import FooterTg from '../../assets/icons/FooterTg';
import FooterVk from '../../assets/icons/FooterVk';
import FooterYoutube from '../../assets/icons/FooterYoutube';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <nav className={styles.nav} aria-label="Социальные сети">
          <ul className={styles.list}>
            <li className={styles.item}>
              <a
                href="https://vk.com/"
                aria-label="ВКонтакте"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FooterVk />
              </a>
            </li>
            <li className={styles.item}>
              <a
                href="https://www.youtube.com/"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FooterYoutube />
              </a>
            </li>
            <li className={styles.item}>
              <a
                href="https://ok.ru/"
                aria-label="Одноклассники"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FooterOk />
              </a>
            </li>
            <li className={styles.item}>
              <a
                href="https://web.telegram.org/a/"
                aria-label="Telegram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FooterTg />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
