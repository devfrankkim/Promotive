import { FormEvent, useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { darkLightMode, dNdState, IToDo } from "../../../atom";

import styled from "styled-components";

import DragCard from "../DragCard/DragCard";

import handleDNDtodoLocalStorage from "../../../utils/dnd.utils";
import { NO_SWEAR } from "../../../utils/constants/noSwear";
import { TDarkMode } from "../../../types";

import { BiEdit, BiTrash } from "react-icons/bi";
import { MdOutlineCancelPresentation } from "react-icons/md";
import * as S from "../styles";

interface IBoardProps {
  key?: string;
  boardIndex: number;
  boardList: IToDo[];
  boardTitle: string;
  boardId: number;
}

interface IForm {
  [key: string]: string;
}

const Boards = ({
  boardList,
  boardIndex,
  boardTitle,
  boardId,
}: IBoardProps) => {
  const isDarkMode = useRecoilValue(darkLightMode);

  const setAllBoards = useSetRecoilState(dNdState);
  const [isEditBoardTitle, setIsEditBoardTitle] = useState(false);
  const [titleState, setTitleState] = useState(boardTitle);

  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputElement?.current?.focus();
  }, [isEditBoardTitle]);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IForm>();

  const onValid = (data: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: data.cardTextForm,
    };

    setAllBoards((boardList) => {
      const copyBoards = [...boardList];
      const copyContent = copyBoards[boardIndex].content;
      const newContent = [...copyContent, newToDo];

      const newObj = {
        boardId,
        title: boardTitle,
        content: newContent,
      };

      copyBoards.splice(boardIndex, 1);
      copyBoards.splice(boardIndex, 0, newObj);

      handleDNDtodoLocalStorage([...copyBoards]);

      return [...copyBoards];
    });

    setValue("cardTextForm", "");
  };

  const onSubmitBoardTitle = (e: FormEvent) => {
    e.preventDefault();

    NO_SWEAR.includes(titleState.toLocaleLowerCase())
      ? alert("no swearing")
      : setAllBoards((oldBoards) => {
          const copyBoards = [...oldBoards];

          const targetIndex = copyBoards.findIndex(
            (item) => item.boardId === boardId
          );

          let targetBoard = { ...copyBoards[targetIndex] };
          targetBoard = {
            ...copyBoards[targetIndex],
            title: titleState,
          };

          copyBoards.splice(targetIndex, 1);
          copyBoards.splice(targetIndex, 0, targetBoard);

          handleDNDtodoLocalStorage(copyBoards);
          return copyBoards;
        });
  };

  const onDeleteBoard = () => {
    setAllBoards((oldBoardList) => {
      const copyBoardList = [...oldBoardList];
      const newBoardList = copyBoardList.filter(
        (item, index) => index !== boardIndex
      );

      handleDNDtodoLocalStorage(newBoardList);

      return newBoardList;
    });
  };

  return (
    <Draggable
      draggableId={`board-${boardIndex + 1}`}
      index={boardIndex}
      key={`board-${boardIndex + 1}`}
    >
      {(provided) => (
        <CardWrapper
          darkMode={isDarkMode}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <S.WrapperTitle darkMode={isDarkMode}>
            {isEditBoardTitle ? (
              <Form onSubmit={onSubmitBoardTitle}>
                <InputField
                  required
                  placeholder={titleState || ""}
                  defaultValue={titleState}
                  ref={inputElement}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setIsEditBoardTitle(false);
                  }}
                  onChange={(e) => setTitleState(e.currentTarget.value)}
                />
              </Form>
            ) : (
              <span className="WrapperTitle__title">{boardTitle}</span>
            )}

            <div className="WrapperTitle__edit_delete_div">
              {isEditBoardTitle ? (
                <MdOutlineCancelPresentation
                  className="icon cancel-icon"
                  onClick={() => setIsEditBoardTitle(false)}
                />
              ) : (
                <div className="WrapperTitle__edit_delete__buttons">
                  <BiEdit
                    className="icon"
                    onClick={() => setIsEditBoardTitle(true)}
                  />
                  <BiTrash className="icon" onClick={() => onDeleteBoard()} />
                </div>
              )}
            </div>
          </S.WrapperTitle>

          <Form onSubmit={handleSubmit(onValid)}>
            <InputField
              {...register("cardTextForm", {
                required: " write down !!! ",
                validate: {
                  doNotSwear: (value) => {
                    return NO_SWEAR.includes(value.toLowerCase())
                      ? "No swearing"
                      : true;
                  },
                },
              })}
              placeholder={`Write down ${boardTitle}`}
            />
          </Form>

          <span>{errors?.boardTitle?.message}</span>
          <span>{errors?.cardTextForm?.message}</span>

          <Droppable droppableId={boardId + ""} type="card">
            {(provided) => (
              <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
                {boardList.map((card, index) => (
                  <DragCard
                    key={card.id}
                    cardId={card.id}
                    cardText={card.text}
                    index={index}
                    boardIndex={boardIndex}
                  />
                ))}
                {provided.placeholder}
              </Wrapper>
            )}
          </Droppable>
        </CardWrapper>
      )}
    </Draggable>
  );
};

export default Boards;

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
  input {
    width: 100%;
  }
`;

const CardWrapper = styled.div<TDarkMode>`
  overflow: hidden;
  padding: 1rem;
  box-shadow: ${(props) => props.darkMode && props.theme.darkBoxShadow};
  background-color: rgb(255, 255, 255);
  border: 0.2rem solid rgb(17, 17, 17);
  border-radius: 1rem;
  width: 15rem;
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
