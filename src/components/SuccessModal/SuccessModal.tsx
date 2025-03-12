import OnClose from "../../img/OnClose";
import Modal from "../Modal/Modal";
import styles from "./SuccessModal.module.css";
import logo from "../../img/modalLogo.png";

interface ISuccessModal {
  setIsOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const SuccessModal = ({ setIsOpenLogin, setIsOpenSuccess }: ISuccessModal) => {
  const handleLogin = () => {
    setIsOpenLogin(true);
    setIsOpenSuccess(false);
  };
  return (
    <Modal>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            <img src={logo} alt="" />
          </div>
          <h2 className={styles.subtitle}>Регистрация завершена</h2>
          <p className={styles.descr}>
            Используйте вашу электронную почту для входа
          </p>
          <button onClick={handleLogin} className={`${styles.btnEnter} btnPrimary`}>Войти</button>
          <button
            onClick={() => setIsOpenSuccess(false)}
            className={styles.btnClose}
          >
            <OnClose />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
