import { useState } from "react";
import { todoStore } from "../../store/todo";
import styles from "./TodoAdd.module.css";

const TodoAdd = () => {
  const [value, setValue] = useState<string>("");

  const changeText = (text: string) => {
    const lower = text.toLowerCase();
    const splitted = lower.split("");
    const first = splitted[0].toUpperCase();
    const rest = [...splitted];
    rest.splice(0, 1);
    const result = [first, ...rest].join("");
    return result;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length < 3) {
      return alert("Короткая запись");
    }
    todoStore.addTodo(changeText(value));
    setValue("");
  };
  return (
    <form className={styles.form}>
      <input
        className={styles.form_input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder={
          todoStore.language === "ru" ? "Добавить новую задачу" : "Add new task"
        }
      />
      {todoStore.language === "ru" ? (
        <button className={styles.button_form} onClick={(e) => handleSubmit(e)}>
          Добавить
        </button>
      ) : (
        <button className={styles.button_form} onClick={(e) => handleSubmit(e)}>
          Add
        </button>
      )}
    </form>
  );
};

export default TodoAdd;
