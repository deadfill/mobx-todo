import { observer } from "mobx-react-lite";
import { ITodos, todoStore } from "../../store/todo";
import styles from "./TodoItem.module.css";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import clsx from "clsx";

const TodoItem = observer(({ todo }: { todo: ITodos }): JSX.Element => {
  const handleCompleted = (id: ITodos["id"]) => {
    todoStore.toggleTodo(id);
  };

  const handleOpenModal = (id: ITodos["id"]) => {
    todoStore.changeActiveId(id);
    todoStore.toogleShow();
  };

  console.log("RENDER ITEM");

  return (
    <>
      <li
        className={clsx(styles.wrapper_todo, {
          [styles.completed]: todo.completed,
        })}
      >
        <div className={styles.flex}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleCompleted(todo.id)}
          />
          <div>{todo.title}</div>
        </div>
        <div>
          <button
            className={styles.remove_button}
            onClick={() => todoStore.removeTodo(todo.id)}
          >
            <AiFillDelete />
          </button>
          <button
            onClick={() => handleOpenModal(todo.id)}
            className={styles.update_button}
          >
            <FaEdit />
          </button>
        </div>
      </li>
    </>
  );
});

export default TodoItem;
