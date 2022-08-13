import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragCard from "./DragCard";

interface IBoardProps {
  allBoards: string[];
  cardKey: string;
}

const Boards = ({ allBoards, cardKey }: IBoardProps) => {
  return (
    <CardWrapper>
      <div>{cardKey}</div>
      <Droppable droppableId={cardKey}>
        {(magic) => (
          <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
            {allBoards.map((toDo, index) => (
              <DragCard key={toDo} toDo={toDo} index={index} />
            ))}
            {magic.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </CardWrapper>
  );
};

export default Boards;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  color: ${(props) => props.theme.boardTextColor};
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;
