import styles from "./Modal.module.css";
import { todoStore } from "../../store/todo";
import { useState } from "react";
import clsx from "clsx";
import { observer } from "mobx-react-lite";

const Modal = observer((): JSX.Element => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  console.log("RENDER MODAL");
  const handleUpdateTodo = () => {
    if (text.length < 3) {
      setError(true);
      setText("");
      return;
    }
    setError(false);
    todoStore.updateTodo(text);
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
        <div>
          <h3>Введите новое значение</h3>
          {error && <div className={styles.error}>Слишком короткая запись</div>}
          <div>
            <input
              className={styles.modal_input}
              type="text"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button onClick={() => handleUpdateTodo()}>Сохранить</button>
          <button onClick={() => handleCancelUpdate()}>Отмена</button>
        </div>
      </div>
    </>
  );
});

export default Modal;
