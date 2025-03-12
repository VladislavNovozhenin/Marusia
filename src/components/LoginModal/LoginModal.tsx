import OnClose from "../../img/OnClose";
import Modal from "../Modal/Modal";
import styles from "./LoginModal.module.css";
import logo from "../../img/modalLogo.png";
import * as Yup from "yup";
import Password from "../../img/modal/Password";
import Email from "../../img/modal/Mail";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { fetchLogin } from "../../request";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import { LoginData } from "../../types";

interface ILoginModal {
  setIsOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenRegistr: React.Dispatch<React.SetStateAction<boolean>>;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Некорректный email").required("Введите email"),
  password: Yup.string()
    .min(6, "Пароль должен быть минимум 6 символов")
    .required("Введите пароль"),
});

const LoginModal = ({ setIsOpenLogin, setIsOpenRegistr }: ILoginModal) => {
  const dispatch = useAppDispatch();
  const [isFocus, setIsFocus] = useState<string | null>(null);
  const handleRegister = () => {
    setIsOpenLogin(false);
    setIsOpenRegistr(true);
  };

  const handleSubmit = async (values: LoginData) => {
    await dispatch(fetchLogin(values));
    toast.success("Login was successful!", { theme: "colored" });
    sessionStorage.setItem('auth', 'true')
    setIsOpenLogin(false);
  };

  return (
    <Modal>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            <img src={logo} alt="" />
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={styles.form}>
              <fieldset className={styles.fieldset}>
                <div
                  className={`${styles.field} ${
                    isFocus === "email" ? styles.fieldFocus : ""
                  }`}
                >
                  <Email />
                  <Field
                    name="email"
                    className={styles.input}
                    placeholder="Электронная почта"
                    type="text"
                    onFocus={() => setIsFocus("email")}
                    onBlur={() => setIsFocus(null)}
                  />
                </div>
                <ErrorMessage
                  component="p"
                  name="email"
                  className={styles.errorText}
                />
                <div
                  className={`${styles.field} ${
                    isFocus === "password" ? styles.fieldFocus : ""
                  }`}
                >
                  <Password />
                  <Field
                    name="password"
                    autoComplete="new-password"
                    className={styles.input}
                    placeholder="Пароль"
                    type="password"
                    onFocus={() => setIsFocus("password")}
                    onBlur={() => setIsFocus(null)}
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className={styles.errorText}
                />
              </fieldset>

              <button className={`${styles.btnEnter} btnPrimary`}>Войти</button>
              <button onClick={handleRegister} className={styles.btnReg}>
                Регистрация
              </button>
            </Form>
          </Formik>

          <button
            onClick={() => setIsOpenLogin(false)}
            className={styles.btnClose}
          >
            <OnClose />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
