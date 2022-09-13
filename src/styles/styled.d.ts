import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor?: string;
    bgColor?: string;
    accentColor?: string;
    prev?: () => void;
    boardColor?: string;
    cardColor?: string;
    boardTextColor?: string;
    darkBG: string;
    darkBoxShadow: string;
    backgroudPomodoro: string;
  }
}
