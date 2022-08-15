import React from "react";
import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragCard from "./DragCard/DragCard";
import { arrayATOM, IArrayAtom, IToDo } from "../../../atom";
import { useRecoilState } from "recoil";

interface IBoardProps {
  boardList: IToDo[];
  boardKey: string;
}

interface IForm {
  toDo: string;
}

const Boards = ({ boardList, boardKey }: IBoardProps) => {
  const [toDos, setToDos] = useRecoilState(arrayATOM);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IForm>();

  const onValid = (data: IForm) => {
    console.log(data);
    const newToDo = {
      id: Date.now(),
      text: data.toDo,
    };

    setToDos((boardList) => {
      return {
        ...boardList,
        [boardKey]: [newToDo, ...boardList[boardKey]],
      };
    });
    setValue("toDo", "");
  };

  return (
    <CardWrapper>
      <div>{boardKey}</div>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", {
            required: " write down !!! ",
            validate: {
              checkValue: (value) =>
                value.includes("!") ? "Type... something" : true,
            },
          })}
          placeholder={`Write down ${boardKey}`}
        />
      </Form>
      <span>{errors?.toDo?.message}</span>

      <Droppable droppableId={boardKey}>
        {(magic) => (
          <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
            {boardList.map((toDo, index) => (
              <DragCard key={toDo.id} toDoText={toDo.text} index={index} />
            ))}
            {magic.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </CardWrapper>
  );
};

export default Boards;

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
