import { DefaultTheme } from "styled-components";

// color: ${(props) => (props.darkMode ? "rgba(0, 255, 255, 0.7)" : "#8A2BE2")};

export const lightTheme: DefaultTheme = {
  textColor: "black",
  bgColor: "white",
  accentColor: "8A2BE2",
  boardColor: "#DADFE9",
  cardColor: "white",
  boardTextColor: "black",
  darkBG: "",
  darkBoxShadow: `rgba(0, 0, 0, 0.35) 0px 3px 10px`,
};

export const darkTheme: DefaultTheme = {
  textColor: "black",
  bgColor: "black",
  accentColor: "rgba(0, 255, 255, 0.7)",
  boardColor: "#DADFE9",
  cardColor: "white",
  boardTextColor: "black",
  darkBG: "white",
  darkBoxShadow: `0px 1px 2px 0px rgba(0, 255, 255, 0.7),
  1px 2px 4px 0px rgba(0, 255, 255, 0.7),
  2px 4px 8px 0px rgba(0, 255, 255, 0.7),
  2px 4px 16px 0px rgba(0, 255, 255, 0.7)`,
};
