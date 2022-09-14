import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { TABLET } from "utils/responsiveness";

const LeftMenu = () => {
  const { pathname } = useLocation();

  return (
    <Wrapper>
      <ContainerList>
        <Link to="/about/pomodoro">
          <ActiveButtonLabel
            active={pathname === "/about/pomodoro"}
            htmlFor="pomodoro"
          >
            QNA-pomodoro
            <ButtonOption type="radio" value="1" id="pomodoro" />
          </ActiveButtonLabel>
        </Link>
        <Link to="/about/scheduler">
          <ActiveButtonLabel
            active={pathname === "/about/scheduler"}
            htmlFor="scheduler"
          >
            QNA-scheduler
            <ButtonOption type="radio" value="2" id="scheduler" />
          </ActiveButtonLabel>
        </Link>
        <Link to="/about/forecast">
          <ActiveButtonLabel
            active={pathname === "/about/forecast"}
            htmlFor="forecast"
          >
            QNA-forecast
            <ButtonOption type="radio" value="3" id="forecast" />
          </ActiveButtonLabel>
        </Link>
        <Link to="/about/us">
          <ActiveButtonLabel active={pathname === "/about/us"} htmlFor="us">
            About us
            <ButtonOption type="radio" value="4" id="us" />
          </ActiveButtonLabel>
        </Link>
      </ContainerList>
      <div className="left-menu">
        <Link to="/about/pomodoro">QNA-pomodoro</Link>
        <Link to="/about/scheduler">QNA-scheduler</Link>
        <Link to="/about/forecast">QNA-forecast</Link>
        <Link to="/about/us">About us</Link>
      </div>
    </Wrapper>
  );
};

export default LeftMenu;

const ButtonOption = styled.input`
  display: none;
`;

const ActiveButtonLabel = styled.label<{ active: Boolean }>`
  display: inline-block;
  cursor: pointer;
  background-color: ${({ active }) => active && "rgba(231, 231, 231, 1)"};
  border: ${({ active }) =>
    active ? "2px solid rgba(0, 0, 0, 1)" : "2px solid rgba(215, 215, 215, 1)"};
  border-radius: 9999px;

  text-align: center;
  font-size: 0.6rem;
  font-weight: 600;

  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  padding-left: 0.6rem;
  padding-right: 0.6rem;

  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  margin-right: 0.375rem;

  @media ${TABLET} {
    font-size: 1.2rem;
    border: ${({ active }) =>
      active
        ? "3px solid rgba(0, 0, 0, 1)"
        : "3px solid rgba(215, 215, 215, 1)"};
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    margin-right: 0.8rem;
  }
`;

const ContainerList = styled.li`
  display: inline-block;

  @media ${TABLET} {
    display: none;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-auto-flow: column;

  grid-gap: 2rem;
  top: 10rem;
  font-size: 1rem;

  @media ${TABLET} {
    grid-auto-flow: row;
    justify-content: start;
    top: 10rem;
    font-size: 2rem;
    margin-left: 1rem;
  }

  .left-menu {
    display: none;

    @media ${TABLET} {
      display: grid;
      align-items: center;
      justify-content: center;
      grid-gap: 2rem;
    }
  }
`;
