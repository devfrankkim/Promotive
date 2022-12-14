import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { FaHamburger } from "react-icons/fa";

import styled from "styled-components";

import { boxShadow, FlexCenter, palette } from "styles/styles";

import { useRecoilValue } from "recoil";
import { darkLightMode } from "recoil/DnDToDoAtom";

import DarkMode from "components/DarkMode";

import { TDarkMode, TDarkModeActive } from "types";
import { TABLET } from "utils/responsiveness";
import useCloseOutside from "hooks/useCloseOutside";

const Header = () => {
  const isDarkMode = useRecoilValue(darkLightMode);

  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const domNode = useCloseOutside(() => {
    setIsOpen(false);
  });

  return (
    <Wrapper
      darkMode={isDarkMode}
      ref={domNode}
      onKeyDown={(e) => {
        if (e.key === "Escape") setIsOpen(false);
      }}
    >
      <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
        Promotive
      </Link>
      <BurgerButton
        darkMode={isDarkMode}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FaHamburger />
      </BurgerButton>
      <NavContainer darkMode={isDarkMode}>
        <NavActiveOption
          active={pathname === "/pomodoro"}
          darkMode={isDarkMode}
        >
          <Link to="/pomodoro" className="nav">
            Pomodoro
          </Link>
        </NavActiveOption>
        <NavActiveOption
          active={pathname === "/scheduler"}
          darkMode={isDarkMode}
        >
          <Link to="/scheduler" className="nav">
            Scheduler
          </Link>
        </NavActiveOption>
        <NavActiveOption
          active={pathname === "/forecast"}
          darkMode={isDarkMode}
        >
          <Link to="/forecast" className="nav">
            Forecast
          </Link>
        </NavActiveOption>
        <NavActiveOption
          active={
            pathname === "/about" ||
            pathname === `/about/pomodoro` ||
            pathname === `/about/scheduler` ||
            pathname === `/about/forecast` ||
            pathname === `/about/us`
          }
          darkMode={isDarkMode}
        >
          <Link to="/about" className="nav">
            About
          </Link>
        </NavActiveOption>
        <DarkMode />
      </NavContainer>
      {isOpen && (
        <HeaderModal darkMode={isDarkMode}>
          <DarkMode />
          <Link to="/pomodoro" className="nav" onClick={() => setIsOpen(false)}>
            Pomodoro
          </Link>
          <Link
            to="/scheduler"
            className="nav"
            onClick={() => setIsOpen(false)}
          >
            Scheduler
          </Link>
          <Link to="/forecast" className="nav" onClick={() => setIsOpen(false)}>
            Forecast
          </Link>
          <Link to="/about" className="nav" onClick={() => setIsOpen(false)}>
            About
          </Link>
        </HeaderModal>
      )}
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div<TDarkMode>`
  background: ${palette.darkPurple};
  color: ${palette.white};

  padding: 1rem 0.5rem;
  font-weight: bold;
  ${boxShadow.type3};

  .logo {
    font-family: "Pacifico", cursive;
    font-style: normal;
    font-size: 25px;
    cursor: pointer;

    :hover {
      color: ${(props) =>
        props.darkMode ? `${palette.lightPurple}` : `${palette.orange}`};
    }

    @media ${TABLET} {
      font-size: 40px;
    }
  }

  ${FlexCenter}
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 99999;
`;

const NavContainer = styled.div<TDarkMode>`
  display: none;

  @media ${TABLET} {
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    align-items: center;
    grid-gap: 2rem;

    cursor: pointer;
    letter-spacing: 0.1rem;

    .nav {
      :hover {
        color: ${(props) =>
          props.darkMode ? `${palette.lightPurple}` : `${palette.orange}`};
      }
    }
  }
`;

const NavActiveOption = styled.div<TDarkModeActive>`
  color: ${(props) =>
    props.active && props.darkMode
      ? `${palette.lightPurple}`
      : props.active && !props.darkMode
      ? `${palette.orange}`
      : "white"};
`;

const HeaderModal = styled.div<TDarkMode>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  ${boxShadow.type13};

  /* border: 1px solid white; */

  background: ${(props) =>
    props.darkMode ? `${palette.white}` : `${palette.darkPurple}`};

  color: ${(props) =>
    props.darkMode ? `${palette.darkPurple}` : `${palette.white}`};

  position: absolute;
  right: 0;
  top: 4rem;
  width: 200px;
  height: 300px;

  .nav {
    :hover {
      color: ${(props) =>
        props.darkMode ? `${palette.lightPurple}` : `${palette.orange}`};
      opacity: 0.9;
    }
  }

  @media ${TABLET} {
    display: none;
  }
`;

const BurgerButton = styled.button<TDarkMode>`
  ${FlexCenter};

  cursor: pointer;
  background: none;
  border: none;
  color: white;
  font-size: 1.1rem;
  outline: none;

  :hover {
    color: ${(props) =>
      props.darkMode ? `${palette.lightPurple}` : `${palette.orange}`};
    opacity: 0.9;
  }

  @media ${TABLET} {
    display: none;
  }
`;

// color: ${(props) =>
//   props.active
//     ? props.darkMode
//     : `${palette.lightPurple}`
//     ? `${palette.orange}`
//     : "white"};
