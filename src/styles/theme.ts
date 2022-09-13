import { DefaultTheme } from "styled-components";
import { palette } from "./styles";

export const lightTheme: DefaultTheme = {
  textColor: "black",
  bgColor: "#fff",
  accentColor: "8A2BE2",
  boardColor: `${palette.purpleDND}`,
  cardColor: `${palette.white}`,
  boardTextColor: "black",
  darkBG: "",
  darkBoxShadow: `rgba(0, 0, 0, 0.35) 0px 3px 10px`,
  backgroudPomodoro: `${palette.darkPurple}`,
};

export const darkTheme: DefaultTheme = {
  textColor: "black",
  bgColor: "black",
  accentColor: "rgba(0, 255, 255, 0.7)",
  boardColor: `${palette.darkPurple}`,
  cardColor: `${palette.purpleDND}`,
  boardTextColor: "black",
  darkBG: "#fff",
  darkBoxShadow: `0px 1px 2px 0px rgba(0, 255, 255, 0.7),
  1px 2px 4px 0px rgba(0, 255, 255, 0.7),
  2px 4px 8px 0px rgba(0, 255, 255, 0.7),
  2px 4px 16px 0px rgba(0, 255, 255, 0.7)`,
  backgroudPomodoro: `${palette.orangeGradient}`,
};
