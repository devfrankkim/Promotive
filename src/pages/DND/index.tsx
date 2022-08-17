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
  // console.log(allBoards);

  const onDragEnd = (info: DropResult) => {
    const { source, destination, type } = info;
    console.log(destination);
    console.log(source);

    if (!destination || !source) return;

    // ======= Board movement =======
    if (type === "board") {
      if (destination?.index === source?.index) return;
      setAllBoards((oldBoards) => {
        const copyBoards = [...oldBoards];
        const replacedBoard = copyBoards.splice(source.index, 1)[0];
        const result = copyBoards.splice(destination?.index, 0, replacedBoard);

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
        setAllBoards((oldBoards) => {
          const copyBoards = [...oldBoards];
          const replacedIndex = copyBoards.findIndex(
            (list) => list.title === source.droppableId
          );

          console.log(typeof copyBoards[replacedIndex].content);

          // error => console.log(copyBoards[replacedIndex].content);
          const newBoard = [...copyBoards[replacedIndex].content];

          // const newTask = newBoard?.splice(source.index, 1);
          console.log(newBoard);

          const a = newBoard[source.index];

          console.log(a);

          newBoard.splice(source.index, 1);
          newBoard.splice(destination.index, 0, a);

          console.log(newBoard);

          // const copyBoard = copyBoards[source.index].content;
          // console.log(copyBoard);
          // const replacedTask = copyBoard?.splice(source.index, 1);
          // console.log(replacedTask);

          // const newBoards = copyBoards[source.index];
          // const replacedTask = copyBoards.splice(source.index, 1);
          // console.log(replacedTask);
          return oldBoards;
        });
        // setAllBoards((allBoards) => {
        //   const newBoard = [...allBoards[source.droppableId]];
        //   const replacedTask = newBoard.splice(source.index, 1)[0];
        //   newBoard.splice(destination?.index, 0, replacedTask);

        //   const result = {
        //     ...allBoards,
        //     [source.droppableId]: newBoard,
        //   };
        //   handleDNDtodoLocalStorage(result);
        //   return result;
        // });
      }

      // ======= (cross board) card movement =======
      if (destination.droppableId !== source.droppableId) {
        // setAllBoards((allBoards) => {
        //   const sourceBoard = [...allBoards[source.droppableId]];
        //   const destinationBoard = [...allBoards[destination.droppableId]];
        //   const replacedTask = sourceBoard.splice(source.index, 1)[0];
        //   destinationBoard.splice(destination?.index, 0, replacedTask);
        //   const result = {
        //     ...allBoards,
        //     [source.droppableId]: sourceBoard,
        //     [destination.droppableId]: destinationBoard,
        //   };
        //   handleDNDtodoLocalStorage(result);
        //   return result;
        // });
      }
    }
  };

  const addToState = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setAllBoards((oldBoards) => {
      const copyBoards = [...oldBoards];
      const newBoards = [{ title: value + " ", content: [] }, ...copyBoards];
      console.log(newBoards);
      return newBoards;
    });

    // if (value.length !== 0)
    //   setAllBoards((lists) => {
    //     const result = { [value + " "]: [], ...lists };
    //     handleDNDtodoLocalStorage(result);

    //     return result;
    //   });

    // setValue("");
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
                {allBoards.map((boardId, index) => (
                  <Boards
                    key={boardId.title + index}
                    boardList={boardId.content}
                    boardTitle={boardId?.title}
                    boardId={boardId}
                    boardIndex={index}
                  />
                ))}
                {/* {Object.keys(allBoards).map((boardId, index) => (
                  <Boards
                    key={boardId}
                    boardList={allBoards[boardId]}
                    boardId={boardId}
                    index={index}
                  />
                ))} */}
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
