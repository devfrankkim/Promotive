import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dNdState } from "../../../atom";
import handleDNDtodoLocalStorage from "../../../utils/dnd.utils";

type TDragCard = {
  index: number;
  toDoId: number;
  toDoText: string;
  boardIndex: number;
};

const DragCard = ({ toDoId, toDoText, index, boardIndex }: TDragCard) => {
  const [allBoards, setAllBoards] = useRecoilState(dNdState);

  const deleteCard = (toDoId: number): void => {
    setAllBoards((oldBoards) => {
      const copyBoards = [...oldBoards];
      const newBoard = copyBoards[boardIndex].content.filter(
        (card) => card.id !== toDoId
      );

      copyBoards[boardIndex] = {
        ...copyBoards[boardIndex],
        content: newBoard,
      };

      handleDNDtodoLocalStorage(copyBoards);
      return copyBoards;
    });
  };

  return (
    <>
      <Draggable key={toDoText} draggableId={toDoId + ""} index={index}>
        {(provided) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <span>{toDoText}</span>
              <button onClick={() => deleteCard(toDoId)}>X</button>
              <button>edit</button>
            </div>
          </Card>
        )}
      </Draggable>
    </>
  );
};

export default React.memo(DragCard);

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  color: ${(props) => props.theme.boardTextColor};
  background-color: ${(props) => props.theme.cardColor};
`;
