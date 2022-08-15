import React, { FormEvent, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { arrayATOM } from "../../atom";
import Boards from "./Boards/Boards";

const DND = () => {
  const [allBoards, setAllBoards] = useRecoilState(arrayATOM);
  const [value, setValue] = useState("");
  console.log(allBoards);

  const onDragEnd = (info: DropResult) => {
    const { draggableId, source, destination } = info;

    if (!destination || !source) return;

    // ======= same board movement =======
    if (destination?.droppableId === source.droppableId) {
      setAllBoards((allBoards) => {
        const newBoard = [...allBoards[source.droppableId]];
        const replacedTask = newBoard.splice(source.index, 1)[0];

        newBoard.splice(destination?.index, 0, replacedTask);

        return {
          ...allBoards,
          [source.droppableId]: newBoard,
        };
      });
    }

    // ======= cross board movement =======
    if (destination.droppableId !== source.droppableId) {
      setAllBoards((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        const replacedTask = sourceBoard.splice(source.index, 1)[0];
        destinationBoard.splice(destination?.index, 0, replacedTask);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  const addToState = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (value.length !== 0)
      setAllBoards((lists) => {
        return { [value]: [], ...lists };
      });

    setValue("");
  };

  return (
    <>
      <form onSubmit={addToState}>
        <input
          placeholder="+ Add another list"
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value || ""}
        />
      </form>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <BoardsWrapper>
            {Object.keys(allBoards).map((boardKey) => (
              <Boards
                key={boardKey}
                boardList={allBoards[boardKey]}
                boardKey={boardKey}
              />
            ))}
          </BoardsWrapper>
        </Wrapper>
      </DragDropContext>
    </>
  );
};

export default DND;

const BoardsWrapper = styled.div`
  display: grid;
  width: 100%;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
