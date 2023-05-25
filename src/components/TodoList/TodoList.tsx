import { observer } from "mobx-react-lite";
import { ITodos } from "../../store/todo";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";
import { todoStore } from "../../store/todo";

const TodoList = observer(({ todos }: { todos: ITodos[] }) => {
  console.log("RENDER LIST");

  if (todos.length <= 0) {
    return (
      <>
        {todoStore.language === "ru" ? (
          <div>Вы еще не добавили не одну задачу</div>
        ) : (
          <div>You have not added any task yet</div>
        )}
      </>
    );
  }
  const renderTodos = todos.map((item) => (
    <TodoItem key={item.id} todo={item} />
  ));
  return <ul className={styles.wrapper}>{renderTodos}</ul>;
});

export default TodoList;
