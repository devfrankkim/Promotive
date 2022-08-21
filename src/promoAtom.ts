import { atom, selector } from "recoil";

export const timeState = atom({
  key: "timer",
  default: 30 * 60 * 1000,
});
