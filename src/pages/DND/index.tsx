import { FormEvent, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { darkLightMode, dNdState, IArrayAtom } from "recoil/DnDToDoAtom";

import Boards from "./Boards";

import styled from "styled-components";

import { FaTrash } from "react-icons/fa";
import { LAPTOP, TABLET } from "utils/responsiveness";

import { TDarkMode } from "types";

import { handleDNDtodoLocalStorage } from "utils/helpers";
import { FlexCenter, palette } from "styles/styles";

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
    if (window.confirm("Are you sure you want to delete all boards?")) {
      handleDNDtodoLocalStorage([]);
      setAllBoards([]);
    } else {
      return;
    }
  };
  return (
    <DNDWrapper>
      <Form onSubmit={addToState}>
        <input
          placeholder="+ Add another list"
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value || ""}
        />
        <ClearAll>
          <FaTrash onClick={clearAllBoads} />
        </ClearAll>
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
                darkMode={isDarkMode}
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
    </DNDWrapper>
  );
};

export default DND;

const DNDWrapper = styled.div`
  ${FlexCenter}
  flex-direction: column;
`;

const Form = styled.form`
  ${FlexCenter}
  text-align: center;
  margin: 0 auto;
  position: relative;
  top: 6rem;
  width: 100%;
  height: auto;
  overflow: hidden;

  input {
    position: absolute;
    display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
    display: -ms-flexbox; /* TWEENER - IE 10 */
    display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
    display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
    justify-content: center;
    align-items: center;

    outline: none;
    border-radius: 12px;
    padding: 10px 10px;

    background: ${palette.orange};
    font-size: 1.2rem;
    border: none;
    color: white;
    max-width: 250px;

    ::placeholder {
      color: white;
      display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
      display: -ms-flexbox; /* TWEENER - IE 10 */
      display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
      display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    @media ${TABLET} {
      max-width: 450px;
      padding: 10px 20px;
      font-size: 1.5rem;
    }
  }

  @media ${TABLET} {
    max-width: 450px;
    padding: 10px 20px;
    font-size: 1.5rem;
  }
`;

const ClearAll = styled.button`
  position: relative;
  font-size: 1.4rem;
  background: none;
  border: none;
  margin-left: 10rem;

  color: ${palette.orange};
  right: -5rem;

  :hover {
    opacity: 0.7;
    cursor: pointer;
    transition: 0.1s;
  }
  @media ${TABLET} {
    font-size: 2rem;
    left: 7rem;
  }
`;

const BoardsWrapper = styled.div<TDarkMode>`
  width: 100%;
  position: relative;
  top: 10rem;
  display: grid;
  grid-gap: 1rem;
  padding-bottom: 2rem;

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
