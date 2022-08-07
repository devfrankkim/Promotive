import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { categoryState, IToDo, toDoState } from "../atom";

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const setToDoListState = useSetRecoilState(toDoState);
  const getCategory = useRecoilValue(categoryState);

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDoListState((oldToDos) => [
      {
        text: toDo,
        id: Date.now(),
        category: getCategory as IToDo["category"],
      },
      ...oldToDos,
    ]);

    setValue("toDo", "");
  };

  
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
};

export default CreateToDo;
