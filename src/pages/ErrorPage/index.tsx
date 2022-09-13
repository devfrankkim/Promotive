import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { darkLightMode } from "recoil/DnDToDoAtom";

import styled from "styled-components";
import { palette } from "styles/styles";
import { TDarkMode } from "types";
import { TABLET } from "utils/responsiveness";

const ErrorPage = () => {
  const isDarkMode = useRecoilValue(darkLightMode);

  return (
    <Frame>
      <Container>
        <BodyPage darkMode={isDarkMode}>
          <h1>404</h1>
          <h2>Sorry, the page you tried cannot be found</h2>
        </BodyPage>
        <FlexCenter>
          <Link to="/">
            <BackHomeButton darkMode={isDarkMode}>Back home</BackHomeButton>
          </Link>
        </FlexCenter>
      </Container>
    </Frame>
  );
};

export default ErrorPage;

const Frame = styled.div`
  width: 100vw;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  font-family: KoPubWorld Dotum, sans-serif;
  margin: 0;
  padding: 1rem;
`;

const BodyPage = styled.section<TDarkMode>`
  color: ${(props) =>
    props.darkMode ? `${palette.white}` : `${palette.darkPurple}`};

  padding: 5rem 0;
  width: 90vw;
  margin: 0 auto;
  margin-top: 7rem;
  max-width: 1170px;
  text-align: center;
  font-size: 1.5rem;

  @media ${TABLET} {
    background-size: 200%;
    font-size: 3rem;
  }
`;

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  display: -webkit-flex;
`;

const BackHomeButton = styled.button<TDarkMode>`
  background-color: ${(props) =>
    props.darkMode ? `${palette.lightPurple}` : `${palette.orange}`};
  border-radius: 5px;
  color: rgba(255, 255, 255, 1);
  display: inline-block;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  padding: 1rem 2rem;
  text-align: center;
  border: none;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
  :hover {
    transition: 0.1s ease-in-out;
    transform: scale(1.1, 1.1);
  }
  @media ${TABLET} {
    border-radius: 10px;
    font-size: 1.3rem;
    padding-bottom: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 1rem;
  }
`;
