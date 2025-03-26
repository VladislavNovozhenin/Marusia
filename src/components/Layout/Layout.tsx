import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ModalManager from '../ModalManager/ModalManager';
import styles from './Layout.module.css';

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
      <ModalManager />
    </>
  );
};

export default Layout;
