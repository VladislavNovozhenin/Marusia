import { useEffect } from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

interface IModal {
  children: React.ReactNode;
}

const Modal = ({ children }: IModal) => {
  useEffect(() => {
    document.body.classList.add("stop-scroll");
    return () => document.body.classList.remove("stop-scroll");
  }, []);
  return ReactDOM.createPortal(
    <div className={styles.modal}>{children}</div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
