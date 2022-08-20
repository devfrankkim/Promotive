import React, { FormEvent, useEffect, useRef, useState } from "react";

import { Draggable } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";

import styled from "styled-components";

import { dNdState } from "../../../atom";
import handleDNDtodoLocalStorage from "../../../utils/dnd.utils";

type TDragCard = {
  index: number;
  cardId: number;
  cardText: string;
  boardIndex: number;
};

const DragCard = ({ cardId, cardText, index, boardIndex }: TDragCard) => {
  const [allBoards, setAllBoards] = useRecoilState(dNdState);
  const [isEditCard, setIsEditCard] = useState(false);
  const [cardContent, setCardContent] = useState(cardText);

  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputElement?.current?.focus();
  }, [isEditCard]);

  const onDeleteCard = (cardId: number): void => {
    setAllBoards((oldBoards) => {
      const copyBoards = [...oldBoards];
      const newBoard = copyBoards[boardIndex].content.filter(
        (card) => card.id !== cardId
      );

      copyBoards[boardIndex] = {
        ...copyBoards[boardIndex],
        content: newBoard,
      };

      handleDNDtodoLocalStorage(copyBoards);
      return copyBoards;
    });
  };

  const onHandleCardContent = (e: FormEvent) => {
    e.preventDefault();

    const copyBoards = [...allBoards];
    const targetBoardContent = [...copyBoards[boardIndex].content];
    const targetIndex = targetBoardContent.findIndex(
      (item) => item.id === cardId
    );
    let targetCard = targetBoardContent[targetIndex];
    targetCard = {
      id: cardId,
      text: cardContent,
    };

    targetBoardContent.splice(targetIndex, 1);
    targetBoardContent.splice(targetIndex, 0, targetCard);
    copyBoards[boardIndex] = {
      ...copyBoards[boardIndex],
      content: targetBoardContent,
    };

    handleDNDtodoLocalStorage(copyBoards);
    setAllBoards(copyBoards);
    setIsEditCard(false);
  };

  return (
    <>
      <Draggable key={cardText} draggableId={cardId + ""} index={index}>
        {(provided) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              {isEditCard ? (
                <Form onSubmit={onHandleCardContent}>
                  <input
                    required
                    ref={inputElement}
                    placeholder={cardText}
                    defaultValue={cardText}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setIsEditCard(false);
                    }}
                    onChange={(e) => setCardContent(e.target.value)}
                  />
                  <button type="button" onClick={() => setIsEditCard(false)}>
                    X
                  </button>
                </Form>
              ) : (
                <div>
                  <span>{cardText}</span>
                  <button onClick={() => onDeleteCard(cardId)}>X</button>
                  <button onClick={() => setIsEditCard(true)}>edit</button>
                </div>
              )}
            </div>
          </Card>
        )}
      </Draggable>
    </>
  );
};

export default React.memo(DragCard);

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  color: ${(props) => props.theme.boardTextColor};
  background-color: ${(props) => props.theme.cardColor};
`;
