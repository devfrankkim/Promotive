import styled from "styled-components";
import { FlexCenter } from "styles/styles";
import { TABLET } from "utils/responsiveness";

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0 2rem;
  margin: auto;
  top: 15rem;

  @media ${TABLET} {
    width: 60%;
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
  list-style-type: none;

  background-color: rgba(242, 242, 242, 1);
  color: rgba(112, 112, 112, 1);
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.625rem;
  line-height: 2;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  margin-bottom: 0.3rem;

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
  color: rgba(246, 85, 0, 1);
  margin-right: 0.2rem;
`;

export const AnswerLetter = styled.span`
  color: rgba(107, 155, 255, 1);
  margin-right: 0.2rem;
`;

export const ArrowButton = styled.div`
  cursor: pointer;
  font-size: 1.3rem;
`;

export const ArrowModalButton = styled.button`
  cursor: pointer;
  border: none;
  :hover {
    opacity: 0.7;
  }
`;
