import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";

type TDragCard = {
  toDoId: number;
  toDoText: string;
  index: number;
};

const DragCard = ({ toDoId, toDoText, index }: TDragCard) => {
  return (
    <>
      <Draggable key={toDoText} draggableId={toDoId + ""} index={index}>
        {(provided) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {toDoText}
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
