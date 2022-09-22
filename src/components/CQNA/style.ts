import styled from "styled-components";
import { boxShadow, FlexCenter, palette } from "styles/styles";
import { LAPTOP, TABLET } from "utils/responsiveness";

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0 2rem;

  top: 11rem;

  @media ${TABLET} {
    width: 60%;
    margin-left: 18rem;
  }

  @media ${LAPTOP} {
    width: 70%;
    margin-right: 0;
  }
`;

export const WrapperS = styled.div`
  width: 100%;
  position: relative;
`;

export const ContainerUl = styled.ul`
  gap: 0.375rem;
`;

export const FAQlist = styled.li`
  ${boxShadow.type1};

  list-style-type: none;

  background-color: rgba(242, 242, 242, 1);
  background: #e5e3ec;
  color: ${palette.darkPurple};
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.625rem;
  line-height: 2;

  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;

  margin-bottom: 2rem;

  @media ${TABLET} {
    font-size: 1rem;
    padding: 1rem;
  }
`;

export const ContainerQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerAnswer = styled.div<{ isShowing: boolean }>`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: ${({ isShowing }) => (isShowing ? "block" : "none")};
`;

export const QuestionLetter = styled.span`
  ${FlexCenter};
  color: ${palette.orange};
  font-size: 1.5rem;
  margin-right: 1rem;
`;

export const AnswerLetter = styled.span`
  color: ${palette.lightPurple};
  margin-right: 0.2rem;
`;

export const ArrowButton = styled.div`
  cursor: pointer;
  font-size: 1.3rem;
`;

export const ArrowModalButton = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  color: ${palette.orange};
  outline: none;

  :hover {
    opacity: 0.7;
  }
`;
