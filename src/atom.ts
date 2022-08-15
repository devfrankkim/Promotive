import { atom, selector } from "recoil";

export const TODO_KEY = "toDos-list";
export const CATEGORY_OPTION = "TO_DO";
export const ISDARK = "dark-mode";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export const darkLightMode = atom({
  key: "dark-mode",
  default: JSON.parse(localStorage.getItem(ISDARK) as any) || false,
});

export const toDoState = atom<IToDo[]>({
  key: "toDoAtom",
  default: JSON.parse(localStorage.getItem(TODO_KEY) as any) || [],
});

export const categoryState = atom({
  key: "categoryState",
  default:
    JSON.parse(localStorage.getItem(CATEGORY_OPTION) as any) ||
    Categories.TO_DO,
});

// selector doesn't change state BUT can combine different atom states + return function
export const toDoSelector = selector({
  key: "selectorToDO",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos?.filter((toDo) => toDo.category === category);
  },
});

export interface IToDo {
  text: string;
  id: number;
  category?: Categories;
}

export interface IArrayAtom {
  [key: string]: IToDo[];
}

export const arrayATOM = atom<IArrayAtom>({
  key: "arr",
  default: {},
});
