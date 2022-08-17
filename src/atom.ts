import { atom, selector } from "recoil";

export const TODO_KEY = "TODO_KEY";
export const TODO_CATEGORY_OPTION = "TO_DO_CATEGORY_OPTION";
export const ISDARK = "DARK_MODE";
export const DNDTODO = "DND_TO_DO";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category?: Categories;
}

// ============== Dark Mode ==============
export const darkLightMode = atom({
  key: "darkMode",
  default: JSON.parse(localStorage.getItem(ISDARK) as any) || false,
});

// ============== to do list (input) ==============
export const toDoState = atom<IToDo[]>({
  key: "toDoAtom",
  default: JSON.parse(localStorage.getItem(TODO_KEY) as any) || [],
});

export const categoryState = atom({
  key: "categoryState",
  default:
    JSON.parse(localStorage.getItem(TODO_CATEGORY_OPTION) as any) ||
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

// ============== DND ==============

export interface IArrayAtom {
  [key: string]: IToDo[];
}

export const dNdState = atom<IArrayAtom>({
  key: "dndState",
  default: JSON.parse(localStorage.getItem(DNDTODO) as any) || {},
});

export const arrayATOM = atom<IArrayAtom>({
  key: "arr",
  default: {},
});

export const boardTitleState = atom<string>({
  key: "bordTitleState",
  default: "",
});
