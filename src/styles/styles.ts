import { css } from "styled-components";

export const palette = {
  vividRed: "#F44336",
  red: "#E42939",
  blue: "#0099FF",
  blueGray: "#34464B",
  blueLightGray: "#5E7F8A",
  mint: "#13BD7E",
  vividMint: "#10DF99",
  lightMint: "#DCF5EC",
  lightGray: "#F7F7F7",
  gray: "#E9EAEA",
  almostWhite: "#FAFAFA",
  border: "#D1D5DB",
  borderDanger: "#EF5350",
  borderFocus: "#3182F6",
  borderHover: "#90C2FF",
  checked: "#2563EB",
  white: "#FFF",
  textColor: "#111111",
  orange: "#EF6351",
  lightPurple: "#664eff",
  darkPurple: "#1C1535",
  orangeGradient: "linear-gradient(180deg, #f55064 11.59%, #f78361 100%)",
  purpleDND: "#5D5677",
};

export const palettePomodoro = {
  textColor: "#FFF",
};

// https://getcssscan.com/css-box-shadow-examples
export const boxShadow = {
  type1: css`
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  `,
  type3: css`
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  `,
  type13: css`
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  `,
};

export const Card = css`
  background-color: white;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${palette.border};
  border-radius: 5px;
`;

export const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Skeleton = css`
  height: 150px;
  width: 130px;
  flex-direction: column;
  position: absolute;
  top: 2rem;
  left: 2.5rem;
  background: grey;

  ${FlexCenter};
  ${boxShadow.type3};
`;
