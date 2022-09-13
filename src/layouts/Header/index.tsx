import DarkMode from "components/DarkMode";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { FlexCenter, palette } from "styles/styles";

const Header = () => {
  return (
    <Wrapper>
      <Link to="/" className="logo">
        Promotive
      </Link>
      <NavContainer>
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

const Wrapper = styled.div`
  /* @import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap"); */

  background: ${palette.darkPurple};
  color: ${palette.white};
  padding: 0 3rem;
  font-weight: bold;

  .logo {
    /* font-family: "Pacifico", cursive;
    font-style: normal; */
    font-size: 40px;
    cursor: pointer;
  }

  ${FlexCenter}
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 99999;
`;

const NavContainer = styled.div`
  ${FlexCenter}
  align-items: center;
  gap: 2rem;
  cursor: pointer;
  letter-spacing: 0.1rem;

  .nave {
    :hover {
      color: ${palette.orange};
    }
  }
`;
