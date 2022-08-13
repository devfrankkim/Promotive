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
import DragCard from "./DragCard";

// setAllBoards((oldList) => {
//   const newList = [...oldList];
//   // Remove the current index
//   newList.splice(source.index, 1);
//   // Replace the item instead. (옮기려는 index, 0 , 새로운 아이템)
//   newList.splice(destination.index, 0, draggableId);

//   return newList;
// });

const DND = () => {
  const [allBoards, setAllBoards] = useRecoilState(arrayATOM);
  // console.log(allBoards);

  const onDragEnd = (info: DropResult) => {
    const { draggableId, source, destination } = info;

    if (!destination || !source) return;

    const copyBoards = { ...allBoards };
    const boardFrom = [...allBoards[source.droppableId]];
    const boardTo = [...allBoards[destination.droppableId]];

    // if (source.droppableId === destination.droppableId) {
    //   boardTo.splice(source.index, 1);
    // }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // console.log("source", source);
    // console.log("destination", destination);

    console.log(" ====== Before ====== ");

    console.log(boardFrom, source.droppableId, source);
    console.log(boardTo, destination.droppableId, destination);

    console.log(" ====== After ====== ");
    boardFrom.splice(source.index, 1);
    boardTo.splice(destination.index, 0, draggableId);

    console.log(boardFrom, source.droppableId, source.index);
    console.log(boardTo, destination.droppableId, destination.index);

    // console.log("key", copyBoards[source.droppableId], source.droppableId);
    // console.log(
    //   "key",
    //   copyBoards[destination.droppableId],
    //   destination.droppableId
    // );

    setAllBoards((boards) =>
      source.droppableId !== destination.droppableId
        ? {
            ...boards,
            [source.droppableId]: boardFrom,
            [destination.droppableId]: boardTo,
          }
        : {
            ...boards,
            [destination.droppableId]: boardTo,
          }
    );

    // if (destination.droppableId === source.droppableId) {
    //   const copyBoards = { ...allBoards };
    //   console.log(copyBoards);
    // }
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
