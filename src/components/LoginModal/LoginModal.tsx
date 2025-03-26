import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Email from '../../assets/icons/Mail';
import Password from '../../assets/icons/Password';
import logo from '../../assets/img/modalLogo.png';
import Modal from '../Modal/Modal';
import OnClose from '../../assets/icons/OnClose';
import { useAppDispatch } from '../../store/hooks';
import { LoginData } from '../../types';
import { useLazyProfileQuery, useLoginMutation } from '../../services/authService';
import { login } from '../../store/userSlice';
import { closeModal, openModal } from '../../store/modalSlice';
import styles from './LoginModal.module.css';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Некорректный email').required('Введите email'),
  password: Yup.string().min(6, 'Пароль должен быть минимум 6 символов').required('Введите пароль'),
});

const LoginModal = () => {
  const [isFocus, setIsFocus] = useState<string | null>(null);
  const [fetchLog] = useLoginMutation();
  const [fetchProfile] = useLazyProfileQuery();
  const dispath = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (values: LoginData) => {
    const result = await fetchLog(values);
    if ('error' in result) {
      return;
    }
    toast.success('Login was successful!', { theme: 'colored' });
    const { data: user } = await fetchProfile();
    if (user) {
      dispath(login(user));
    }
    localStorage.setItem('auth', 'true');
    dispath(closeModal());
  };

  return (
    <Modal>
      <div role="dialog" className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            <img src={logo} alt="" />
          </div>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={styles.form}>
              <fieldset className={styles.fieldset}>
                <div className={`${styles.field} ${isFocus === 'email' ? styles.fieldFocus : ''}`}>
                  <Email />
                  <Field
                    ref={inputRef}
                    name="email"
                    className={styles.input}
                    placeholder="Электронная почта"
                    type="text"
                    onFocus={() => setIsFocus('email')}
                    onBlur={() => setIsFocus(null)}
                    aria-label="Введите email"
                  />
                </div>
                <ErrorMessage component="p" name="email" className={styles.errorText} />
                <div
                  className={`${styles.field} ${isFocus === 'password' ? styles.fieldFocus : ''}`}
                >
                  <Password />
                  <Field
                    name="password"
                    autoComplete="new-password"
                    className={styles.input}
                    placeholder="Пароль"
                    type="password"
                    onFocus={() => setIsFocus('password')}
                    onBlur={() => setIsFocus(null)}
                    aria-label="Введите пароль"
                  />
                </div>
                <ErrorMessage name="password" component="p" className={styles.errorText} />
              </fieldset>

              <button aria-label="Войти" className={`${styles.btnEnter} button btnSecondary`}>
                Войти
              </button>
              <button
                aria-label="Перейти на регистрацию"
                onClick={() => dispath(openModal('register'))}
                className={`${styles.btnReg} button`}
              >
                Регистрация
              </button>
            </Form>
          </Formik>

          <button
            aria-label="Закрыть форму"
            onClick={() => dispath(closeModal())}
            className={`${styles.btnClose} button`}
          >
            <OnClose />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
