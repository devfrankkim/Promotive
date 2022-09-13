import DarkMode from "components/DarkMode";

import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { darkLightMode } from "recoil/DnDToDoAtom";
import styled from "styled-components";
import { FlexCenter, palette } from "styles/styles";
import { TDarkMode } from "types";

const Header = () => {
  const isDarkMode = useRecoilValue(darkLightMode);

  return (
    <Wrapper darkMode={isDarkMode}>
      <Link to="/" className="logo">
        Promotive
      </Link>
      <NavContainer darkMode={isDarkMode}>
        <Link to="/pomodoro" className="nav">
          Pomodoro
        </Link>
        <Link to="/scheduler" className="nav">
          Scheduler
        </Link>
        <Link to="/forecast" className="nav">
          Forecast
        </Link>
        <DarkMode />
      </NavContainer>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div<TDarkMode>`
  background: ${palette.darkPurple};
  color: ${palette.white};
  padding: 0 3rem;
  font-weight: bold;

  .logo {
    font-family: "Pacifico", cursive;
    font-style: normal;
    font-size: 40px;
    cursor: pointer;

    :hover {
      color: ${(props) =>
        props.darkMode ? `${palette.lightPurple}` : `${palette.orange}`};
    }
  }

  ${FlexCenter}
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 99999;
`;

const NavContainer = styled.div<TDarkMode>`
  /* gap not working on safari */
  // ${FlexCenter};
  // align-items: center;
  // gap: 2rem;

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
`;
