import { useState } from "react";
import { todoStore } from "../../store/todo";
import styles from "./TodoAdd.module.css";

const TodoAdd = () => {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length < 3) {
      return alert("sdgfd");
    }
    todoStore.addTodo(value);
    setValue("");
  };
  return (
    <form className={styles.form}>
      <input
        className={styles.form_input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
      />
      {todoStore.language === "ru" ? (
        <button onClick={(e) => handleSubmit(e)}>Добавить</button>
      ) : (
        <button onClick={(e) => handleSubmit(e)}>Add</button>
      )}
    </form>
  );
};

export default TodoAdd;
