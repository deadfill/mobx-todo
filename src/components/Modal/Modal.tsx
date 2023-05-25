import styles from "./Modal.module.css";
import { todoStore } from "../../store/todo";
import { useState } from "react";
import clsx from "clsx";
import { observer } from "mobx-react-lite";

const Modal = observer((): JSX.Element => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const changeText = (text: string) => {
    const lower = text.toLowerCase();
    const splitted = lower.split("");
    const first = splitted[0].toUpperCase();
    const rest = [...splitted];
    rest.splice(0, 1);
    const result = [first, ...rest].join("");
    return result;
  };

  console.log("RENDER MODAL");
  const handleUpdateTodo = () => {
    if (text.length < 3) {
      setError(true);
      setText("");
      return;
    }
    setError(false);
    todoStore.updateTodo(changeText(text));
    todoStore.toogleShow();
  };

  const handleCancelUpdate = () => {
    todoStore.toogleShow();
    setError(false);
    setText("");
  };

  return (
    <>
      <div
        className={clsx(styles.cover, {
          [styles.coverShow]: todoStore.show,
        })}
        onClick={() => todoStore.toogleShow()}
      ></div>
      <div
        className={clsx(styles.modal, {
          [styles.modalShow]: todoStore.show,
        })}
      >
        <div className={styles.modal_wrapper}>
          {todoStore.language === "ru" ? (
            <h3 className={styles.modal_title}>Введите новое значение</h3>
          ) : (
            <h3 className={styles.modal_title}>Enter new value</h3>
          )}

          {error && <div className={styles.error}>Слишком короткая запись</div>}
          <input
            className={styles.modal_input}
            type="text"
            onChange={(e) => setText(e.target.value)}
          />
          <div className={styles.wrapper_modal_button}>
            <button
              className={styles.button_modal}
              onClick={() => handleCancelUpdate()}
            >
              Отмена
            </button>
            <button
              className={styles.button_modal}
              onClick={() => handleUpdateTodo()}
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default Modal;
