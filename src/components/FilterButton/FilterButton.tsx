import { observer } from "mobx-react-lite";
import { IFilters, todoStore } from "../../store/todo";
import styles from "./FilterButton.module.css";

interface IFilterButton {
  name: string;
  filters: IFilters;
}

const FilterButton = observer(
  ({ name, filters }: IFilterButton): JSX.Element => {
    return (
      <button
        className={styles.filter_button}
        onClick={() => todoStore.changeFilters(filters)}
      >
        {name}
      </button>
    );
  }
);

export default FilterButton;
