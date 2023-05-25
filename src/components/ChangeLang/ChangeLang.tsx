import { observer } from "mobx-react-lite";
import { todoStore } from "../../store/todo";

const ChangeLang = observer(() => {
  console.log(todoStore.language);
  return (
    <select
      onChange={(e) => todoStore.changeLanguage(e.target.value)}
      defaultValue={todoStore.language}
    >
      <option value="ru">Rus</option>
      <option value="en">Eng</option>
    </select>
  );
});

export default ChangeLang;
