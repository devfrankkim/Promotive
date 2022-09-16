import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { TABLET } from "utils/responsiveness";

import { AiOutlineQuestionCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FlexCenter, palette } from "styles/styles";
import { useRecoilValue } from "recoil";
import { darkLightMode } from "recoil/DnDToDoAtom";
import { TDarkModeActive } from "types";

const LeftMenu = () => {
  const isDarkMode = useRecoilValue(darkLightMode);

  const { pathname } = useLocation();

  return (
    <Wrapper>
      <div className="center-menu">
        <Link to="/about/pomodoro">
          <ActiveButtonLabel
            darkMode={isDarkMode}
            className="mobile-label"
            active={pathname === "/about/pomodoro"}
            htmlFor="pomodoro"
          >
            <AiOutlineQuestionCircle className="icon" />
            QNA-pomodoro
            <ButtonOption type="radio" value="1" id="pomodoro" />
          </ActiveButtonLabel>
        </Link>
        <Link to="/about/scheduler">
          <ActiveButtonLabel
            darkMode={isDarkMode}
            className="mobile-label"
            active={pathname === "/about/scheduler"}
            htmlFor="scheduler"
          >
            <AiOutlineQuestionCircle className="icon" />
            QNA-scheduler
            <ButtonOption type="radio" value="2" id="scheduler" />
          </ActiveButtonLabel>
        </Link>
        <Link to="/about/forecast">
          <ActiveButtonLabel
            darkMode={isDarkMode}
            className="mobile-label"
            active={pathname === "/about/forecast"}
            htmlFor="forecast"
          >
            <AiOutlineQuestionCircle className="icon" />
            QNA-forecast
            <ButtonOption type="radio" value="3" id="forecast" />
          </ActiveButtonLabel>
        </Link>
        <Link to="/about/us">
          <ActiveButtonLabel
            darkMode={isDarkMode}
            className="mobile-label"
            active={pathname === "/about/us"}
            htmlFor="us"
          >
            <CgProfile className="icon" />
            About us
            <ButtonOption type="radio" value="4" id="us" />
          </ActiveButtonLabel>
        </Link>
      </div>
      <div className="left-menu">
        <div className="left-menu__container">
          <Link to="/about/pomodoro">
            <ActiveButtonLabel
              className="left-menu__container-options first-one"
              darkMode={isDarkMode}
              active={pathname === "/about/pomodoro"}
            >
              <AiOutlineQuestionCircle className="icon" />{" "}
              <div> QNA-pomodoro</div>
            </ActiveButtonLabel>
          </Link>
          <Link to="/about/scheduler">
            <ActiveButtonLabel
              className="left-menu__container-options"
              darkMode={isDarkMode}
              active={pathname === "/about/scheduler"}
            >
              <AiOutlineQuestionCircle className="icon" />
              QNA-scheduler
            </ActiveButtonLabel>
          </Link>
          <Link to="/about/forecast">
            <ActiveButtonLabel
              className="left-menu__container-options"
              darkMode={isDarkMode}
              active={pathname === "/about/forecast"}
            >
              <AiOutlineQuestionCircle className="icon" />
              QNA-forecast
            </ActiveButtonLabel>
          </Link>
          <Link to="/about/us">
            <ActiveButtonLabel
              className="left-menu__container-options"
              darkMode={isDarkMode}
              active={pathname === "/about/us"}
            >
              <CgProfile className="icon" />
              About us
            </ActiveButtonLabel>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default LeftMenu;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;

  color: ${palette.white};

  display: grid;
  justify-content: flex-start;
  grid-auto-flow: column;

  font-size: 1rem;

  .center-menu {
    padding: 0 0.5rem;
    position: absolute;
    width: 100%;
    display: grid;
    align-items: center;
    justify-content: center;
    grid-auto-flow: column;

    grid-gap: 1.2rem;
    top: 6rem;
    font-size: 1rem;

    .icon {
      margin-right: 0.3rem;
    }

    @media ${TABLET} {
      grid-auto-flow: row;
      justify-content: start;
      top: 10rem;
      font-size: 2rem;
      margin-left: 1rem;
    }

    @media ${TABLET} {
      display: none;
    }
  }

  .left-menu {
    display: none;

    @media ${TABLET} {
      background: ${palette.darkPurple};
      position: absolute;

      top: 5rem;
      display: flex;

      flex-direction: column;
      height: calc(100vh - 5rem);
    }

    .icon {
      margin-right: 1rem;
    }
  }

  .left-menu__container {
    margin-top: 5rem;
  }

  .left-menu__container-options.first-one {
    margin-top: 1rem;
  }

  .left-menu__container-options {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    padding: 0rem 2.5rem 0rem 1rem;
  }
`;

const ActiveButtonLabel = styled.label<TDarkModeActive>`
  display: inline-block;
  cursor: pointer;

  color: ${(props) =>
    props.active && props.darkMode
      ? `${palette.lightPurple}`
      : props.active && !props.darkMode
      ? `${palette.orange}`
      : "white"};

  text-align: center;
  font-size: 0.6rem;
  border: none;

  border-radius: 9999px;

  /* .mobile-label { */
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  margin-right: 0.375rem;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  border-radius: 9999px;

  color: ${palette.white};

  border: ${({ active }) =>
    active ? "2px solid rgba(0, 0, 0, 1)" : "2px solid rgba(215, 215, 215, 1)"};

  background: ${(props) =>
    props.active && props.darkMode
      ? `${palette.lightPurple}`
      : props.active && !props.darkMode
      ? `${palette.orange}`
      : "grey"};

  font-weight: 600;

  :hover {
    opacity: 0.9;
    transition: ease-in-out 0.1s;
  }

  @media ${TABLET} {
    background: none;
    border: none;
    font-size: 1.2rem;

    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    margin-right: 0.8rem;

    color: ${(props) =>
      props.active && props.darkMode
        ? `${palette.lightPurple}`
        : props.active && !props.darkMode
        ? `${palette.orange}`
        : "white"};
  }
`;

const ButtonOption = styled.input`
  display: none;
`;
