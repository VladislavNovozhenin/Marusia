import OnClose from '../../assets/icons/OnClose';
import Modal from '../Modal/Modal';
import logo from '../../assets/img/modalLogo.png';
import { useAppDispatch } from '../../store/hooks';
import { closeModal, openModal } from '../../store/modalSlice';
import styles from './SuccessModal.module.css';

const SuccessModal = () => {
  const dispatch = useAppDispatch();

  return (
    <Modal>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            <img src={logo} alt="" />
          </div>
          <h2 className={styles.subtitle}>Регистрация завершена</h2>
          <p className={styles.descr}>Используйте вашу электронную почту для входа</p>
          <button
            aria-label="Перейти на форму входа"
            onClick={() => dispatch(openModal('login'))}
            className={`${styles.btnEnter} button btnSecondary`}
          >
            Войти
          </button>
          <button
            aria-label="Закрыть форму"
            onClick={() => dispatch(closeModal())}
            className={`${styles.btnClose} button`}
          >
            <OnClose />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
