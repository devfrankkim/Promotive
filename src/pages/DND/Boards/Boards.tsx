import { FormEvent, useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { dNdState, IToDo } from "../../../atom";

import styled from "styled-components";

import DragCard from "../DragCard/DragCard";

import handleDNDtodoLocalStorage from "../../../utils/dnd.utils";
import { NO_SWEAR } from "../../../utils/constants/noSwear";

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
  [key: string]: string;
}

const Boards = ({
  boardList,
  boardIndex,
  boardTitle,
  boardId,
}: IBoardProps) => {
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
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <WrapperTitle>
            {isEditBoardTitle ? (
              <Form onSubmit={onSubmitBoardTitle}>
                <input
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
              <h2 className="WrapperTitle__title">{boardTitle}</h2>
            )}

            <div className="WrapperTitle__edit_delete">
              {isEditBoardTitle ? (
                <button onClick={() => setIsEditBoardTitle(false)}> x </button>
              ) : (
                <div>
                  <button onClick={() => setIsEditBoardTitle(true)}>
                    수정
                  </button>
                  <button onClick={() => onDeleteBoard()}> x </button>
                </div>
              )}
            </div>
          </WrapperTitle>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
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

const WrapperTitle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 1px 2px 0px rgba(0, 255, 255, 0.7),
    1px 2px 4px 0px rgba(0, 255, 255, 0.7),
    2px 4px 8px 0px rgba(0, 255, 255, 0.7),
    2px 4px 16px 0px rgba(0, 255, 255, 0.7);

  .WrapperTitle__title {
    align-items: center;
    display: flex;
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

/* <TextArea
            maxLength={10}
            defaultValue={boardTitle}
            onChange={handleTitle}
          /> */
