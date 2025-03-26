import { useAppSelector } from '../../store/hooks';
import LoginModal from '../LoginModal/LoginModal';
import RegistrModal from '../RegistrModal/RegistrModal';
import SuccessModal from '../SuccessModal/SuccessModal';

const ModalManager = () => {
  const modalType = useAppSelector((state) => state.modal.modalType);

  return (
    <>
      {modalType === 'login' && <LoginModal />}
      {modalType === 'register' && <RegistrModal />}
      {modalType === 'success' && <SuccessModal />}
    </>
  );
};

export default ModalManager;
