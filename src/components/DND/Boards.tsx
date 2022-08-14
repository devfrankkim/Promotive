import React from "react";
import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragCard from "./DragCard";

interface IBoardProps {
  allBoards: string[];
  cardKey: string;
}

interface IForm {
  toDo: string;
}

const Boards = ({ allBoards, cardKey }: IBoardProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IForm>();

  const onValid = (data: any) => {
    const newToDo = {
      id: Date.now(),
      text: data,
    };

    // setToDos((allBoards) => {
    //   return {
    //     ...allBoards,
    //     [boardId]: [newToDo, ...allBoards[boardId]],
    //   };
    // });
    setValue("toDo", "");
  };
  console.log(errors);

  return (
    <CardWrapper>
      <div>{cardKey}</div>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", {
            required: " write down !!! ",
            validate: {
              checkValue: (value) =>
                value.includes("!") ? "Type... something" : true,
            },
          })}
          placeholder={`Write down ${cardKey}`}
        />
      </Form>
      <span>{errors?.toDo?.message}</span>
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
