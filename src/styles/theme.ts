import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  textColor: "black",
  bgColor: "#fff",
  accentColor: "8A2BE2",
  boardColor: `#5D5677`,
  cardColor: `#fff`,
  boardTextColor: "black",
  darkBG: "",
  darkBoxShadow: `rgba(0, 0, 0, 0.35) 0px 3px 10px`,
  backgroudPomodoro: "#1C1535",
};

export const darkTheme: DefaultTheme = {
  textColor: "black",
  bgColor: "black",
  accentColor: "rgba(0, 255, 255, 0.7)",
  boardColor: "#1C1535",
  cardColor: "#5D5677",
  boardTextColor: "black",
  darkBG: "#fff",
  darkBoxShadow: `0px 1px 2px 0px rgba(0, 255, 255, 0.7),
  1px 2px 4px 0px rgba(0, 255, 255, 0.7),
  2px 4px 8px 0px rgba(0, 255, 255, 0.7),
  2px 4px 16px 0px rgba(0, 255, 255, 0.7)`,
  backgroudPomodoro: "linear-gradient(180deg, #f55064 11.59%, #f78361 100%)",
};
