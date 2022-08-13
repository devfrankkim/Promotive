import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { arrayATOM } from "../../atom";
import Boards from "./Boards";

const DND = () => {
  const [allBoards, setAllBoards] = useRecoilState(arrayATOM);

  const onDragEnd = (info: DropResult) => {
    const { draggableId, source, destination } = info;

    if (!destination || !source) return;

    const boardFrom = [...allBoards[source.droppableId]];
    const boardTo = [...allBoards[destination.droppableId]];

    // Remove duplicate if same board
    if (source.droppableId === destination.droppableId) {
      boardTo.splice(source.index, 1);
    }

    boardFrom.splice(source.index, 1);
    boardTo.splice(destination.index, 0, draggableId);

    setAllBoards((boards) =>
      source.droppableId !== destination.droppableId
        ? {
            ...boards,
            [source.droppableId]: boardFrom,
            [destination.droppableId]: boardTo,
          }
        : {
            ...boards,
            [source.droppableId]: boardTo,
          }
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <BoardsWrapper>
          {Object.keys(allBoards).map((cardKey) => (
            <Boards
              key={cardKey}
              allBoards={allBoards[cardKey]}
              cardKey={cardKey}
            />
          ))}
        </BoardsWrapper>
      </Wrapper>
    </DragDropContext>
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
