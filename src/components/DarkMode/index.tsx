import { useRecoilState } from "recoil";
import { darkLightMode } from "recoil/DnDToDoAtom";

import styled from "styled-components";

import { TDarkMode } from "types";
import { TABLET } from "utils/responsiveness";

const DarkMode = () => {
  const [isDarkMode, isSetDarkMode] = useRecoilState(darkLightMode);

  return (
    <Wrapper darkMode={isDarkMode}>
      <div className="switch">
        <label className="theme-switch" htmlFor="checkbox">
          <input type="checkbox" id="checkbox" />
          <div
            className="slider round"
            onClick={() => isSetDarkMode((prev: any) => !prev)}
          >
            <span className="sunMode">☀️</span>
            <span className="moonMode">🌙</span>
          </div>
        </label>
      </div>
    </Wrapper>
  );
};

export default DarkMode;

const Wrapper = styled.div<TDarkMode>`
  span {
    user-select: none;
    position: relative;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .switch {
    z-index: 9999;
    position: fixed;
    height: 4rem;
    right: 3rem;
    top: 2rem;

    @media ${TABLET} {
      right: 8rem;
    }
  }

  .theme-switch {
    position: relative;
    display: inline-block;
    width: 45px;
    height: 30px;

    @media ${TABLET} {
      width: 60px;
      height: 34px;
    }
  }

  .theme-switch input {
    display: none;
  }

  .slider {
    border: ${(props) => (!props.darkMode ? "1px solid black" : "")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9999;

    background-color: ${(props) => props.theme.darkBG};
    box-shadow: ${(props) => props.darkMode && props.theme.darkBoxShadow};
    cursor: pointer;
  }

  .slider.round {
    border-radius: 34px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .sunMode {
    display: flex;
    align-items: center;
    background-color: ${(props) => props.darkMode && props.theme.bgColor};
    opacity: ${(props) => props.darkMode && 0};
    transition: 0.3s;
    font-size: 0.9rem;

    @media ${TABLET} {
      font-size: 1.2rem;
    }
  }

  .moonMode {
    display: flex;
    align-items: center;
    background-color: ${(props) => props.darkMode && props.theme.bgColor};
    transform: ${(props) => props.darkMode && "translateX(1px)"};
    opacity: ${(props) => (props.darkMode ? 1 : 0)};
    transition: 0.3s;
    font-size: 0.9rem;
    @media ${TABLET} {
      font-size: 1.2rem;
    }
  }
`;
