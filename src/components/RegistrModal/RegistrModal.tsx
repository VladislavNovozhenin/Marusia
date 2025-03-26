import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import OnClose from '../../assets/icons/OnClose';
import Modal from '../Modal/Modal';
import logo from '../../assets/img/modalLogo.png';
import Password from '../../assets/icons/Password';
import Email from '../../assets/icons/Mail';
import Name from '../../assets/icons/Name';
import { RegisterData } from '../../types';
import { useRegisterMutation } from '../../services/authService';
import { useAppDispatch } from '../../store/hooks';
import { closeModal, openModal } from '../../store/modalSlice';
import styles from './RegistrModal.module.css';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Некорректный email').required('Введите email'),
  name: Yup.string().required('Введите Имя'),
  surname: Yup.string().required('Введите Фамилию'),
  password: Yup.string().min(6, 'Пароль должен быть минимум 6 символов').required('Введите пароль'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Пароли не совпадают')
    .required('Подтверждение пароля обязательно'),
});

const RegistrModal = () => {
  const dispatch = useAppDispatch();
  const [fetchReg] = useRegisterMutation();
  const [isFocus, setIsFocus] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (values: RegisterData) => {
    const result = await fetchReg(values);
    if ('error' in result) {
      return;
    }
    toast.success('Registration was successful!', { theme: 'colored' });
    dispatch(openModal('success'));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Modal>
      <div role="dialog" className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            <img src={logo} alt="" />
          </div>
          <Formik
            initialValues={{
              email: '',
              password: '',
              name: '',
              surname: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={styles.form}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Регистрация</legend>
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
                <div className={`${styles.field} ${isFocus === 'name' ? styles.fieldFocus : ''}`}>
                  <Name />
                  <Field
                    name="name"
                    className={styles.input}
                    placeholder="Имя"
                    type="text"
                    onFocus={() => setIsFocus('name')}
                    onBlur={() => setIsFocus(null)}
                    aria-label="Введите имя"
                  />
                </div>
                <ErrorMessage component="p" name="name" className={styles.errorText} />
                <div
                  className={`${styles.field} ${isFocus === 'surname' ? styles.fieldFocus : ''}`}
                >
                  <Name />
                  <Field
                    name="surname"
                    className={styles.input}
                    placeholder="Фамилия"
                    type="text"
                    onFocus={() => setIsFocus('surname')}
                    onBlur={() => setIsFocus(null)}
                    aria-label="Введите фамилию"
                  />
                </div>
                <ErrorMessage component="p" name="surname" className={styles.errorText} />

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

                <div
                  className={`${styles.field} ${
                    isFocus === 'confirmPassword' ? styles.fieldFocus : ''
                  }`}
                >
                  <Password />
                  <Field
                    name="confirmPassword"
                    className={styles.input}
                    placeholder="Подтвердите пароль"
                    type="password"
                    onFocus={() => setIsFocus('confirmPassword')}
                    onBlur={() => setIsFocus(null)}
                    aria-label="Подтвердите пароль"
                  />
                </div>
                <ErrorMessage name="confirmPassword" component="p" className={styles.errorText} />
              </fieldset>

              <button
                aria-label="Создать аккаунт"
                className={`${styles.btnEnter} button btnSecondary`}
              >
                Создать аккаунт
              </button>
              <button
                aria-label="У меня есть пароль"
                onClick={() => dispatch(openModal('login'))}
                className={`${styles.btnLog} button`}
              >
                У меня есть пароль
              </button>
            </Form>
          </Formik>

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

export default RegistrModal;
