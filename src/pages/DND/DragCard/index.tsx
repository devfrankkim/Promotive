import React, { FormEvent, useEffect, useRef, useState } from "react";

import { BiEdit, BiTrash } from "react-icons/bi";
import { MdOutlineCancelPresentation } from "react-icons/md";

import { Draggable } from "react-beautiful-dnd";

import { useRecoilState, useRecoilValue } from "recoil";

import { darkLightMode, dNdState } from "recoil/DnDToDoAtom";

import styled from "styled-components";

import * as S from "../styles";

import { handleDNDtodoLocalStorage } from "utils/helpers";
import { palette } from "styles/styles";

type TDragCard = {
  index: number;
  cardId: number;
  cardText: string;
  boardIndex: number;
};

const DragCard = ({ cardId, cardText, index, boardIndex }: TDragCard) => {
  const isDarkMode = useRecoilValue(darkLightMode);
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
            <S.WrapperTitle darkMode={isDarkMode}>
              {isEditCard ? (
                <Form onSubmit={onHandleCardContent}>
                  <InputField
                    required
                    ref={inputElement}
                    placeholder={cardText}
                    defaultValue={cardText}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setIsEditCard(false);
                    }}
                    onChange={(e) => setCardContent(e.target.value)}
                  />
                  <MdOutlineCancelPresentation
                    type="button"
                    className="icon cancel-icon"
                    onClick={() => setIsEditCard(false)}
                  />
                </Form>
              ) : (
                <S.FlexCenter>
                  <span>{cardText}</span>
                  <div>
                    <BiEdit
                      className="card icon"
                      onClick={() => setIsEditCard(true)}
                    />
                    <BiTrash
                      className="card icon"
                      onClick={() => onDeleteCard(cardId)}
                    />
                  </div>
                </S.FlexCenter>
              )}
            </S.WrapperTitle>
          </Card>
        )}
      </Draggable>
    </>
  );
};

export default React.memo(DragCard);

const InputField = styled.input`
  outline: none;
  width: 100%;
  padding: 0.4rem 0.2rem 0.6rem;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-bottom: 1px solid black;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  input {
    width: 100%;
  }
`;

const Card = styled.div`
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 1rem;

  color: ${(props) => props.theme.boardTextColor};
  background-color: ${palette.white};
`;
