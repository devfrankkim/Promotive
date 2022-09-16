import React, { ReactNode, useState } from "react";
import {
  IoArrowUpCircleOutline,
  IoArrowDownCircleOutline,
} from "react-icons/io5";
import { FlexCenterDiv } from "styles/styles";

import * as S from "./style";

type TSection = {
  section: {
    answer: string;
    asymbol: string;
    qsymbol: ReactNode;
    question: string;
  };
};

const CQNA = ({ section }: TSection) => {
  const [isShowing, setIsShowing] = useState(false);
  const toggle = () => setIsShowing((prev) => !prev);

  const { qsymbol, question, asymbol, answer } = section;

  return (
    <S.Wrapper>
      <S.WrapperS>
        <S.FAQlist>
          <S.ContainerQuestion>
            <FlexCenterDiv>
              <S.QuestionLetter> {qsymbol} </S.QuestionLetter>
              {question}
            </FlexCenterDiv>
            <S.ArrowModalButton type="button" onClick={toggle}>
              {isShowing ? (
                <IoArrowUpCircleOutline fontSize="32px" />
              ) : (
                <IoArrowDownCircleOutline fontSize="32px" />
              )}
            </S.ArrowModalButton>
          </S.ContainerQuestion>
          <S.ContainerAnswer isShowing={isShowing}>
            <S.AnswerLetter> {asymbol} </S.AnswerLetter> {answer}
          </S.ContainerAnswer>
        </S.FAQlist>
      </S.WrapperS>
    </S.Wrapper>
  );
};

export default CQNA;
