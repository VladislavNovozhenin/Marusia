import styles from "./RegistrModal.module.css";
import OnClose from "../../img/OnClose";
import Modal from "../Modal/Modal";
import logo from "../../img/modalLogo.png";
import * as Yup from "yup";
import Password from "../../img/modal/Password";
import Email from "../../img/modal/Mail";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import Name from "../../img/modal/Name";
import { fetchReg} from "../../request";
import { toast } from "react-toastify";
import { RegisterData } from "../../types";

interface IRegistrModal {
  setIsOpenRegistr: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Некорректный email").required("Введите email"),
  name: Yup.string().required("Введите Имя"),
  surname: Yup.string().required("Введите Фамилию"),
  password: Yup.string()
    .min(6, "Пароль должен быть минимум 6 символов")
    .required("Введите пароль"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Пароли не совпадают")
    .required("Подтверждение пароля обязательно"),
});

const RegistrModal = ({
  setIsOpenLogin,
  setIsOpenRegistr,
  setIsOpenSuccess,
}: IRegistrModal) => {
  const handleLogin = () => {
    setIsOpenLogin(true);
    setIsOpenRegistr(false);
  };

  const handleSuccess = () => {
    setIsOpenSuccess(true);
    setIsOpenRegistr(false);
  };

  const handleSubmit = async (values: RegisterData) => {
    await fetchReg(values);
      toast.success("Registration was successful!", { theme: "colored" });
      handleSuccess();
  };
  const [isFocus, setIsFocus] = useState<string | null>(null);
  return (
    <Modal>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            <img src={logo} alt="" />
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
              name: "",
              surname: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={styles.form}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Регистрация</legend>
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
                    isFocus === "name" ? styles.fieldFocus : ""
                  }`}
                >
                  <Name />
                  <Field
                    name="name"
                    className={styles.input}
                    placeholder="Имя"
                    type="text"
                    onFocus={() => setIsFocus("name")}
                    onBlur={() => setIsFocus(null)}
                  />
                </div>
                <ErrorMessage
                  component="p"
                  name="name"
                  className={styles.errorText}
                />
                <div
                  className={`${styles.field} ${
                    isFocus === "surname" ? styles.fieldFocus : ""
                  }`}
                >
                  <Name />
                  <Field
                    name="surname"
                    className={styles.input}
                    placeholder="Фамилия"
                    type="text"
                    onFocus={() => setIsFocus("surname")}
                    onBlur={() => setIsFocus(null)}
                  />
                </div>
                <ErrorMessage
                  component="p"
                  name="surname"
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

                <div
                  className={`${styles.field} ${
                    isFocus === "confirmPassword" ? styles.fieldFocus : ""
                  }`}
                >
                  <Password />
                  <Field
                    name="confirmPassword"
                    className={styles.input}
                    placeholder="Подтвердите пароль"
                    type="password"
                    onFocus={() => setIsFocus("confirmPassword")}
                    onBlur={() => setIsFocus(null)}
                  />
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className={styles.errorText}
                />
              </fieldset>

              <button className={`${styles.btnEnter} btnPrimary`}>
                Создать аккаунт
              </button>
              <button onClick={handleLogin} className={styles.btnLog}>
                У меня есть пароль
              </button>
            </Form>
          </Formik>

          <button
            onClick={() => setIsOpenRegistr(false)}
            className={styles.btnClose}
          >
            <OnClose />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RegistrModal;
