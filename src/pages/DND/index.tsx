import { FormEvent, useState } from "react";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { darkLightMode, dNdState, IArrayAtom } from "../../atom";

import styled from "styled-components";

import Boards from "./Boards/Boards";

import handleDNDtodoLocalStorage from "../../utils/dnd.utils";

import { FaTrash } from "react-icons/fa";
import { TDarkMode } from "../../types";
import { LAPTOP, TABLET } from "../../utils/responsiveness";

const DND = () => {
  const [isDarkMode, isSetDarkMode] = useRecoilState(darkLightMode);

  const [allBoards, setAllBoards] = useRecoilState<IArrayAtom[]>(dNdState);
  const [value, setValue] = useState("");

  const onDragEnd = (info: DropResult) => {
    const { source, destination, type } = info;
    if (!destination || !source) return;

    // ======= Board movement =======
    if (type === "board") {
      if (destination?.index === source?.index) return;

      setAllBoards((oldBoards) => {
        const copyBoards = [...oldBoards];
        const replacedBoard = copyBoards.splice(source.index, 1)[0];
        copyBoards.splice(destination?.index, 0, replacedBoard);

        handleDNDtodoLocalStorage(copyBoards);
        return copyBoards;
      });
    }

    // ======= Card movement =======
    if (type === "card") {
      // ******* (same board) card movement *******
      if (destination?.droppableId === source.droppableId) {
        if (destination.index === source.index) return;
        setAllBoards((oldBoards) => {
          let copyBoards = [...oldBoards];
          const replacedIndex = copyBoards.findIndex(
            (list) => list.boardId + "" === source.droppableId
          );
          // error => copyBoards[replacedIndex].content;
          const newBoard = [...copyBoards[replacedIndex].content];
          const newCard = newBoard?.splice(source.index, 1)[0];
          newBoard.splice(destination.index, 0, newCard);

          copyBoards[replacedIndex] = {
            boardId: newCard.id,
            title: copyBoards[replacedIndex].title,
            content: newBoard,
          };

          handleDNDtodoLocalStorage(copyBoards);
          return copyBoards;
        });
      }

      // ******* (cross board) card movement *******
      if (destination.droppableId !== source.droppableId) {
        setAllBoards((oldBoards) => {
          let copyBoards = [...oldBoards];
          const sourceId = source.droppableId;
          const destinationId = destination.droppableId;

          // ------ Get index ------
          const targetSourceIndex = copyBoards.findIndex(
            (list) => list.boardId + "" === sourceId
          );
          const targetDestinationIndex = copyBoards.findIndex(
            (list) => list.boardId + "" === destinationId
          );

          // ------ Handle source data------
          const sourceContent = [...copyBoards[targetSourceIndex].content];
          const sourceCard = sourceContent.splice(source.index, 1)[0];

          copyBoards[targetSourceIndex] = {
            boardId: copyBoards[targetSourceIndex].boardId,
            title: copyBoards[targetSourceIndex].title,
            content: sourceContent,
          };

          // ------ Handle destination data ------
          const destinationContent = [
            ...copyBoards[targetDestinationIndex].content,
          ];

          destinationContent.splice(destination.index, 0, sourceCard);

          copyBoards[targetDestinationIndex] = {
            boardId: copyBoards[targetDestinationIndex].boardId,
            title: copyBoards[targetDestinationIndex].title,
            content: destinationContent,
          };

          handleDNDtodoLocalStorage(copyBoards);
          return copyBoards;
        });
      }
    }
  };

  const addToState = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (value.length !== 0)
      setAllBoards((oldBoards) => {
        const copyBoards = [...oldBoards];
        const newBoards = [
          { boardId: Date.now(), title: value + " ", content: [] },
          ...copyBoards,
        ];

        handleDNDtodoLocalStorage(newBoards);
        return newBoards;
      });

    setValue("");
  };

  const clearAllBoads = () => {
    handleDNDtodoLocalStorage([]);
    setAllBoards([]);
  };
  return (
    <>
      <ClearAll darkMode={isDarkMode}>
        <FaTrash onClick={clearAllBoads} />
      </ClearAll>

      <Form onSubmit={addToState}>
        <input
          placeholder="+ Add another list"
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value || ""}
        />
      </Form>

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
                {allBoards.map((board, index) => (
                  <Boards
                    key={board.title + index}
                    boardList={board.content}
                    boardTitle={board?.title}
                    boardIndex={index}
                    boardId={board.boardId}
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

const Form = styled.form`
  text-align: center;
  margin: 0 auto;
  position: relative;
  top: 6rem;
  width: 15rem;
  height: auto;
  overflow: hidden;

  input {
    outline: none;
    border-radius: 50px;
    padding: 15px 50px;
    width: 100%;
  }
  @media ${TABLET} {
    width: 300px;
  }
`;

const ClearAll = styled.button<TDarkMode>`
  position: fixed;
  top: 2rem;
  right: 0;
  font-size: 1.7rem;
  background: none;
  border: none;

  color: ${(props) => (props.darkMode ? "white" : "black")};

  :hover {
    opacity: 0.7;
    cursor: pointer;
    transition: 0.1s;
  }
  @media ${TABLET} {
    font-size: 2rem;
    right: 4rem;
  }
`;

const BoardsWrapper = styled.div`
  position: relative;
  top: 10rem;
  display: grid;
  width: 100%;
  gap: 1rem;
  grid-template-columns: repeat(1, 1fr);

  @media ${TABLET} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${LAPTOP} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
`;
