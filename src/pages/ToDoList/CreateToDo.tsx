import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { categoryState, IToDo, toDoState } from "recoil/DnDToDoAtom";

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const setToDoListState = useSetRecoilState(toDoState);
  const getCategory = useRecoilValue(categoryState);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

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
      <span>{errors?.toDo?.message}</span>
    </form>
  );
};

export default CreateToDo;
