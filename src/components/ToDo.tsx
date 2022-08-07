import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, IToDo, toDoState } from "../atom";

function ToDo({ text, id }: IToDo) {
  const [toDoListState, setToDoListState] = useRecoilState(toDoState);
  const categoryList = useRecoilValue(categoryState);

  const handleCategory = (category: IToDo["category"]) => {
    setToDoListState((oldList) =>
      oldList.map((list) =>
        list.id === id
          ? {
              ...list,
              category,
            }
          : list
      )
    );
  };

  const deleteButton = () => {
    setToDoListState((oldList) => oldList.filter((item) => item.id !== id));
  };

  console.log(categoryList);
  return (
    <li>
      <span>{text}</span>

      {categoryList !== Categories.TO_DO && (
        <button onClick={() => handleCategory(Categories.TO_DO)}>To Do</button>
      )}
      {categoryList !== Categories.DOING && (
        <button onClick={() => handleCategory(Categories.DOING)}>DOING</button>
      )}
      {categoryList !== Categories.DONE && (
        <button onClick={() => handleCategory(Categories.DONE)}>DONE</button>
      )}

      <button onClick={deleteButton}>Delete</button>
    </li>
  );
}

export default ToDo;
