import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragCard from "../DragCard/DragCard";
import { dNdState, boardTitleState, IArrayAtom, IToDo } from "../../../atom";
import { useRecoilState } from "recoil";
import handleDNDtodoLocalStorage from "../../../utils/dnd.utils";

interface IBoardProps {
  // boardList: IToDo[];
  // boardId: string;
  key?: string;
  boardIndex: number;
  boardList: IToDo[];
  boardTitle: string;
  boardId: number;
}

interface IForm {
  toDo: string;
}

const Boards = ({
  boardList,
  boardIndex,
  boardTitle,
  boardId,
}: IBoardProps) => {
  const [allBoards, setAllBoards] = useRecoilState(dNdState);
  const [isEditBoardTitle, setIsEditBoardTitle] = useState(false);

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

    setValue("toDo", "");
  };

  const deleteBoard = () => {
    setAllBoards((oldBoardList) => {
      const copyBoardList = [...oldBoardList];
      const newBoardList = copyBoardList.filter(
        (item, index) => index !== boardIndex
      );

      handleDNDtodoLocalStorage(newBoardList);

      return newBoardList;
    });
  };

  const editBoardTitle = () => {
    setIsEditBoardTitle(true);
    console.log(boardId);
    console.log(boardTitle);

    // setIsEditBoardTitle(false);
  };

  return (
    <Draggable
      draggableId={`board-${boardIndex + 1}`}
      index={boardIndex}
      key={`board-${boardIndex + 1}`}
    >
      {(provided) => (
        <CardWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <WrapperTitle>
            <h2 className="WrapperTitle__title">{boardTitle}</h2>

            <div className="WrapperTitle__edit_delete">
              {isEditBoardTitle ? (
                <button onClick={() => setIsEditBoardTitle(false)}> x </button>
              ) : (
                <div>
                  <button onClick={() => editBoardTitle()}>수정</button>
                  <button onClick={() => deleteBoard()}> x </button>
                </div>
              )}
            </div>
          </WrapperTitle>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("toDo", {
                required: " write down !!! ",
                validate: {
                  checkValue: (value) =>
                    value.includes("!") ? "Type... something" : true,
                },
              })}
              placeholder={`Write down ${boardTitle}`}
            />
          </Form>

          <span>{errors?.toDo?.message}</span>

          <Droppable droppableId={boardId + ""} type="card">
            {(provided) => (
              <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
                {boardList.map((toDo, index) => (
                  <DragCard
                    key={toDo.id}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
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

const WrapperTitle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 1px 2px 0px rgba(0, 255, 255, 0.7),
    1px 2px 4px 0px rgba(0, 255, 255, 0.7),
    2px 4px 8px 0px rgba(0, 255, 255, 0.7),
    2px 4px 16px 0px rgba(0, 255, 255, 0.7);

  .WrapperTitle__title {
    text-overflow: ellipsis;
    border: none;
    overflow: hidden;
    overflow-wrap: break-word;
    height: 28px;
    resize: none;
    text-align: center;
  }

  .WrapperTitle__edit_delete {
    display: flex;
    align-items: center;
    flex-direction: column;
    right: 0;
  }
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

// doNotSwear: (value) => {
//   const noSwear = [
//     "fuck",
//     "fucker",
//     "fucking",
//     "shit",
//     "damn",
//     "dang",
//     "swear",
//   ];
//   return noSwear.includes(value) ? "No swearing" : true;
// },

// const handleTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
// setTitle(e.target.value);
// const copyBoard = { ...allBoards };
// const editValue = copyBoard[boardId];
// delete copyBoard[boardId];
// setAllBoards(() => {
//   const result = { [e.target.value]: editValue, ...copyBoard };
//   handleDNDtodoLocalStorage(result);
//   return result;
// });
// };

{
  /* <TextArea
            maxLength={10}
            defaultValue={boardTitle}
            onChange={handleTitle}
          /> */
}
