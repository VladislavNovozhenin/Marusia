import LoginModal from "../LoginModal/LoginModal";
import RegistrModal from "../RegistrModal/RegistrModal";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Layout.module.css";
import { useState } from "react";
import SuccessModal from "../SuccessModal/SuccessModal";

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegistr, setIsOpenRegistr] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);

  return (
    <>
      <Header setIsOpenLogin={setIsOpenLogin} />
      <main className={styles.main}>{children}</main>
      <Footer />
      {isOpenLogin && (
        <LoginModal
          setIsOpenLogin={setIsOpenLogin}
          setIsOpenRegistr={setIsOpenRegistr}
        />
      )}
      {isOpenRegistr && (
        <RegistrModal
          setIsOpenRegistr={setIsOpenRegistr}
          setIsOpenLogin={setIsOpenLogin}
          setIsOpenSuccess={setIsOpenSuccess}
        />
      )}
      {isOpenSuccess && (
        <SuccessModal
          setIsOpenLogin={setIsOpenLogin}
          setIsOpenSuccess={setIsOpenSuccess}
        />
      )}
    </>
  );
};

export default Layout;
