import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkLightMode, toDoSelector, toDoState, TODO_KEY } from "../atom";
import CategoryList from "./CategoryList";

import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ToDoList = () => {
  const filteredList = useRecoilValue(toDoSelector);
  const toDoListState = useRecoilValue(toDoState);

  const [darkMode, setDarkMode] = useRecoilState(darkLightMode);

  useEffect(() => {
    localStorage.setItem(TODO_KEY, JSON.stringify(toDoListState));
  }, [toDoListState]);

  return (
    <div>
      <h1>To Dos</h1>
      <button onClick={() => setDarkMode((prev: any) => !prev)}>
        dark/light
      </button>
      <hr />

      <CategoryList />
      <CreateToDo />

      <ul>
        {filteredList.map((toDo, index) => (
          <div key={index + 1}>
            <ToDo key={toDo.id} {...toDo} />
          </div>
        ))}
      </ul>
      <hr />
    </div>
  );
};

export default ToDoList;
