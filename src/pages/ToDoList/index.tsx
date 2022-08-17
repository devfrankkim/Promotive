import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { toDoSelector, toDoState, TODO_KEY } from "../../atom";
import CategoryList from "./CategoryList";

import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ToDoList = () => {
  const filteredList = useRecoilValue(toDoSelector);
  const toDoListState = useRecoilValue(toDoState);

  useEffect(() => {
    localStorage.setItem(TODO_KEY, JSON.stringify(toDoListState));
  }, [toDoListState]);

  return (
    <div>
      <h1>To Dos</h1>

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
