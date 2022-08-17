import { atom, selector } from "recoil";
import handleDNDtodoLocalStorage from "./utils/dnd.utils";

export const TODO_KEY = "TODO_KEY";
export const TODO_CATEGORY_OPTION = "TO_DO_CATEGORY_OPTION";
export const ISDARK = "DARK_MODE";
export const DNDTODO = "DND_TO_DO";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
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
export interface IToDo {
  id: number;
  text: string;
  category?: Categories;
}

export interface IArrayAtom {
  boardId: number;
  title: string;
  content: IToDo[];
}

export const dNdState = atom<IArrayAtom[]>({
  key: "dndState",
  default:
    JSON.parse(localStorage.getItem(DNDTODO) as any) ||
    handleDNDtodoLocalStorage([
      {
        boardId: 1,
        title: "for",
        content: [
          { id: 11, text: "messi" },
          { id: 22, text: "ronaldo" },
        ],
      },
      {
        boardId: 2,
        title: "mid",
        content: [
          { id: 33, text: "kevin" },
          { id: 44, text: "modric" },
        ],
      },
      {
        boardId: 3,
        title: "def",
        content: [
          { id: 55, text: "ramos" },
          { id: 66, text: "pique" },
        ],
      },
      {
        boardId: 4,
        title: "def",
        content: [
          { id: 77, text: "ramos" },
          { id: 88, text: "pique" },
        ],
      },
    ]) ||
    [],
});

// export const dNdState = atom<IArrayAtom[]>({
//   key: "dndState",
//   default: JSON.parse(localStorage.getItem(DNDTODO) as any) || [
//     {
//       title: "for",
//       content: [
//         { id: 1, text: "messi" },
//         { id: 2, text: "ronaldo" },
//       ],
//     },
//     {
//       title: "mid",
//       content: [
//         { id: 3, text: "kevin" },
//         { id: 4, text: "modric" },
//       ],
//     },
//     {
//       title: "def",
//       content: [
//         { id: 5, text: "ramos" },
//         { id: 6, text: "pique" },
//       ],
//     },
//   ],
// });

// export interface IArrayAtom {
//   [key: string]: IToDo[];
// }

// export const arrayATOM = atom<IArrayAtom>({
//   key: "arr",
//   default: {},
// });

export const boardTitleState = atom<string>({
  key: "bordTitleState",
  default: "",
});
