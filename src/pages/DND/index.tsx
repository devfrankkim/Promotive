import React, { FormEvent, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dNdState, boardTitleState, IArrayAtom } from "../../atom";
import handleDNDtodoLocalStorage from "../../utils/dnd.utils";
import Boards from "./Boards/Boards";

const DND = () => {
  const [allBoards, setAllBoards] = useRecoilState(dNdState);
  const [value, setValue] = useState("");
  console.log(allBoards);
  const onDragEnd = (info: DropResult) => {
    const { source, destination, type } = info;
    console.log(destination);
    console.log(source);

    if (!destination || !source) return;

    // ======= Board movement =======
    if (type === "board") {
      setAllBoards((oldBoard) => {
        const copyAllBoards = Object.entries({ ...oldBoard });
        const deleteBoard = copyAllBoards.splice(source.index, 1);
        copyAllBoards.splice(destination?.index, 0, ...deleteBoard);

        // const newBoard: IArrayAtom = {};
        // for (let i = 0; i < copyAllBoards.length; i++) {
        //   newBoard[copyAllBoards[i][0]] = copyAllBoards[i][1];
        // }

        const result = Object.fromEntries(copyAllBoards);
        handleDNDtodoLocalStorage(result);

        return result;
      });
    }

    // ======= Card movement =======
    if (type === "card") {
      // ======= (same board) card movement =======
      if (destination?.droppableId === source.droppableId) {
        console.log(destination.droppableId);
        console.log(source.droppableId);
        if (destination.index === source.index) return;

        setAllBoards((allBoards) => {
          const newBoard = [...allBoards[source.droppableId]];
          const replacedTask = newBoard.splice(source.index, 1)[0];
          newBoard.splice(destination?.index, 0, replacedTask);

          const result = {
            ...allBoards,
            [source.droppableId]: newBoard,
          };
          handleDNDtodoLocalStorage(result);
          return result;
        });
      }

      // ======= (cross board) card movement =======
      if (destination.droppableId !== source.droppableId) {
        setAllBoards((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          const destinationBoard = [...allBoards[destination.droppableId]];
          const replacedTask = sourceBoard.splice(source.index, 1)[0];
          destinationBoard.splice(destination?.index, 0, replacedTask);

          const result = {
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };

          handleDNDtodoLocalStorage(result);
          return result;
        });
      }
    }
  };

  const addToState = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (value.length !== 0)
      setAllBoards((lists) => {
        const result = { [value + " "]: [], ...lists };
        handleDNDtodoLocalStorage(result);

        return result;
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
        <Droppable
          droppableId="boardSection"
          type="board"
          direction="horizontal"
        >
          {(provided) => (
            <Wrapper>
              <BoardsWrapper
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {Object.keys(allBoards).map((boardId, index) => (
                  <Boards
                    key={boardId}
                    boardList={allBoards[boardId]}
                    boardId={boardId}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </BoardsWrapper>
            </Wrapper>
          )}
        </Droppable>
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
