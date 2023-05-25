import { observer } from "mobx-react-lite";
import "./App.css";
import ChangeLang from "./components/ChangeLang/ChangeLang";
import Todo from "./components/Todo/Todo";
import { todoStore } from "./store/todo";

const App = observer(() => {
  todoStore.language;
  return (
    <>
      <ChangeLang />
      {todoStore.language === "ru" ? <h1>Список дел</h1> : <h1>Todo List</h1>}
      <Todo />
    </>
  );
});

export default App;
