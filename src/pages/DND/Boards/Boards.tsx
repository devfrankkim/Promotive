import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragCard from "../DragCard/DragCard";
import { dNdState, boardTitleState, IArrayAtom, IToDo } from "../../../atom";
import { useRecoilState } from "recoil";
import handleDNDtodoLocalStorage from "../../../utils/dnd.utils";

interface IBoardProps {
  boardList: IToDo[];
  boardId: string;
  index: number;
}

interface IForm {
  toDo: string;
}

const Boards = ({ boardList, boardId, index }: IBoardProps) => {
  const [allBoards, setAllBoards] = useRecoilState(dNdState);
  const [title, setTitle] = useState(boardId);
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputElement?.current) {
      inputElement?.current?.focus();
    }
  }, []);

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
      text: data.toDo,
    };

    setAllBoards((boardList) => {
      const result = {
        ...boardList,
        [boardId]: [newToDo, ...boardList[boardId]],
      };
      handleDNDtodoLocalStorage(result);

      return result;
    });
    setValue("toDo", "");
  };

  const deleteBoard = (boardId: string): void => {
    setAllBoards((oldBoardList) => {
      const newBoard = { ...oldBoardList };
      delete newBoard[boardId];
      const result = newBoard;
      handleDNDtodoLocalStorage(result);

      return result;
    });
  };

  const handleTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    const copyBoard = { ...allBoards };
    const editValue = copyBoard[boardId];
    delete copyBoard[boardId];

    setAllBoards(() => {
      const result = { [e.target.value]: editValue, ...copyBoard };
      handleDNDtodoLocalStorage(result);
      return result;
    });
  };

  return (
    <Draggable
      draggableId={`board-${index + 1}`}
      index={index}
      key={`board-${index + 1}`}
    >
      {(provided) => (
        <CardWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {/* <h2>{boardId}</h2> */}
          <TextArea
            maxLength={10}
            defaultValue={boardId}
            onChange={handleTitle}
            id={boardId}
            // ref={inputElement}
          />

          <button onClick={() => deleteBoard(boardId)}> x </button>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("toDo", {
                required: " write down !!! ",
                validate: {
                  checkValue: (value) =>
                    value.includes("!") ? "Type... something" : true,
                },
              })}
              placeholder={`Write down ${boardId}`}
            />
          </Form>
          <span>{errors?.toDo?.message}</span>

          <Droppable droppableId={boardId} type="card">
            {(provided) => (
              <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
                {boardList?.map((toDo, index) => (
                  <DragCard
                    key={toDo.id}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                    index={index}
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

const TextArea = styled.textarea`
  text-overflow: ellipsis;
  border: none;
  overflow: hidden;
  overflow-wrap: break-word;
  height: 28px;
  resize: none;
  text-align: center;
  box-shadow: 0px 1px 2px 0px rgba(0, 255, 255, 0.7),
    1px 2px 4px 0px rgba(0, 255, 255, 0.7),
    2px 4px 8px 0px rgba(0, 255, 255, 0.7),
    2px 4px 16px 0px rgba(0, 255, 255, 0.7);
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

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
