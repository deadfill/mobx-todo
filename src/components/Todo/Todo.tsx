import { todoStore } from "../../store/todo";
import TodoAdd from "../TodoAdd/TodoAdd";
import TodoList from "../TodoList/TodoList";
import styles from "./Todo.module.css";
import { observer } from "mobx-react-lite";
import Modal from "../Modal/Modal";
import FilterButton from "../FilterButton/FilterButton";

const Todo = observer(() => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_todo}>
        <TodoAdd />
        {todoStore.language === "ru" ? (
          <div className={styles.wrapper_button_filter}>
            <FilterButton name={"Все"} filters={"all"} />
            <FilterButton name={"Выполненые"} filters={"completed"} />
            <FilterButton name={"Не выполненые"} filters={"notCompleted"} />
          </div>
        ) : (
          <div className={styles.wrapper_button_filter}>
            <FilterButton name={"All"} filters={"all"} />
            <FilterButton name={"Done"} filters={"completed"} />
            <FilterButton name={"Not done"} filters={"notCompleted"} />
          </div>
        )}
        {todoStore.filters === "completed" ? (
          <TodoList todos={todoStore.completedTasks} />
        ) : todoStore.filters === "notCompleted" ? (
          <TodoList todos={todoStore.notCompletedTasks} />
        ) : (
          <TodoList todos={todoStore.todos} />
        )}
      </div>
      <Modal />
    </div>
  );
});
export default Todo;
