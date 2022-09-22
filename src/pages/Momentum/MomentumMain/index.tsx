import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { clockState, ClockVersionState, getTime } from "recoil/clock";
import { modalClockVersion } from "recoil/modal";

import { AiOutlineClockCircle } from "react-icons/ai";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

import styled from "styled-components";

import useCloseOutside from "hooks/useCloseOutside";

import {
  CLOCK_VERSION,
  handleClockVersionLocalStorage,
  handleMomentumNameLocalStorage,
} from "utils/helpers";

import { useCallback } from "react";
import { boxShadow, FlexCenter, palette } from "styles/styles";
import { darkLightMode } from "recoil/DnDToDoAtom";
import { TDarkMode } from "types";
import { LAPTOP, TABLET } from "utils/responsiveness";
import { MomentumState } from "recoil/momentum";

type TMomentumRegister = {
  momentumRegisterForm: string;
};

const MOMENTTUM_REGISTER = "momentumRegisterForm";

const MomentumMain = () => {
  const isDarkMode = useRecoilValue(darkLightMode);

  const [isOpen, setIsOpen] = useRecoilState(modalClockVersion);
  const [isNameEdit, setIsNameEdit] = useState(false);

  const domNode = useCloseOutside(() => {
    setIsOpen(false);
    setIsNameEdit(false);
  });

  const [momentumName, setMomentumName] = useRecoilState(MomentumState);

  const [clockVersion, setClockVersion] = useRecoilState(ClockVersionState);
  const [timeState, setTimeState] = useRecoilState(clockState);

  // =========== useForm ===========
  const {
    register,
    handleSubmit,
    // setValue,

    formState: { errors },
  } = useForm<TMomentumRegister>();

  const tiktok = useCallback(() => {
    setTimeState(getTime(Number(clockVersion)));
  }, [clockVersion, setTimeState]);

  useEffect(() => {
    tiktok();
    const interval = setInterval(tiktok, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [tiktok]);

  // =========== handle 24-hour-clock ===========
  const onHandleClock = () => {
    const TIME = JSON.parse(localStorage.getItem(CLOCK_VERSION) as any);

    TIME === 24
      ? handleClockVersionLocalStorage(12)
      : handleClockVersionLocalStorage(24);

    TIME === 24 ? setClockVersion(12) : setClockVersion(24);
  };

  // =========== useForm submit ===========
  const handleValid = ({ momentumRegisterForm }: TMomentumRegister, e: any) => {
    e.preventDefault();
    setMomentumName(momentumRegisterForm);
    handleMomentumNameLocalStorage(momentumRegisterForm);
    setIsNameEdit(false);

    // ------ clear the value ------
    // setValue(MOMENTTUM_REGISTER, "");
  };

  return (
    <Wrapper>
      <Container ref={domNode} darkMode={isDarkMode}>
        <TimeContainer darkMode={isDarkMode}>
          <div className="real-time">{timeState[0]}</div>
          <div
            className="time-setting-modal"
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsOpen(false);
            }}
          >
            <span ref={domNode} style={{ display: "flex" }}>
              <button
                className="clock-setting"
                onClick={(e) => {
                  setIsOpen((prev) => !prev);
                }}
              >
                <AiOutlineClockCircle />
              </button>

              {isOpen && (
                <ButtonClockSwitch darkMode={isDarkMode}>
                  <div>24-HR</div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      defaultChecked={
                        clockVersion === 24
                          ? true
                          : clockVersion === 12
                          ? false
                          : true
                      }
                    />
                    <span
                      className="slider round"
                      onClick={onHandleClock}
                    ></span>
                  </label>
                </ButtonClockSwitch>
              )}
            </span>
          </div>
        </TimeContainer>
        <TextDiv>
          <div>{timeState[1]}! &nbsp;</div>
          <div>
            {momentumName?.length > 8
              ? momentumName?.substring(0, 9) + "..."
              : momentumName?.length > 0
              ? momentumName + "."
              : momentumName}
          </div>
          {momentumName && (
            <div
              className="edit-name"
              onClick={() => setIsNameEdit((prev) => !prev)}
            >
              <MdOutlineDriveFileRenameOutline />
            </div>
          )}
        </TextDiv>

        <form
          onSubmit={handleSubmit(handleValid)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsNameEdit(false);
          }}
        >
          {momentumName && isNameEdit && (
            <InputBox
              autoComplete="off"
              autoFocus
              type="text"
              {...register(MOMENTTUM_REGISTER, {
                required:
                  "Please let us know how to address you. This is required.",
                validate: {
                  minLength: (value) => {
                    return value.length < 3
                      ? "too short! minimum 3 letters"
                      : true;
                  },
                },
              })}
              defaultValue={momentumName}
            />
          )}

          {(!momentumName || momentumName.length < 2) && (
            <InputBox
              autoComplete="off"
              autoFocus
              type="text"
              placeholder={"What's your name?"}
              {...register(MOMENTTUM_REGISTER, {
                required:
                  "Please let us know how to address you. This is required.",
                validate: {
                  minLength: (value) => {
                    return value.length < 3
                      ? "too short! minimum 3 letters"
                      : true;
                  },
                },
              })}
              defaultValue={momentumName}
            />
          )}
          <ErrorBox>
            {isNameEdit && errors?.momentumRegisterForm?.message}
          </ErrorBox>
        </form>
      </Container>
    </Wrapper>
  );
};

export default MomentumMain;

const Wrapper = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
`;

const Container = styled.div<TDarkMode>`
  box-shadow: rgb(100 100 111 / 20%) 7px 1px 16px 5px;

  background: ${(props) =>
    props.darkMode
      ? "linear-gradient(0deg, #1c1535 0%, #a29cb9 145%)"
      : "linear-gradient(180deg, #1c1535 15%, #a29cb9 160%)"};

  border-radius: 70px;
  color: ${palette.almostWhite};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 95%;
  height: 370px;
  margin-top: 4rem;

  @media ${TABLET} {
    height: 480px;
  }

  @media ${LAPTOP} {
    width: 900px;
    height: 525px;
  }
`;

const TimeContainer = styled.div<TDarkMode>`
  ${FlexCenter};

  .time-setting-modal {
    /* position: absolute; */
    /* right: 100px; */

    /* @media ${TABLET} {
      right: 100px;
    } */
  }
  width: 90%;

  @media ${TABLET} {
  }
  @media ${LAPTOP} {
  }

  .real-time {
    letter-spacing: 3px;
    font-size: 3.5rem;
    font-weight: bold;
    margin-right: 1rem;
    margin-bottom: 1rem;

    @media ${TABLET} {
      font-size: 5rem;
    }
  }

  .clock-setting {
    background: none;
    border: none;
    color: ${palette.almostWhite};
    cursor: pointer;

    font-size: 1.5rem;
    font-weight: bold;

    :hover {
      transition: ease-in-out 0.2s;
      opacity: 0.8;
      transform: scale(1.5);
      outline: none;
    }
  }
`;

// --------- Text (greet + name) ---------
const TextDiv = styled.span`
  ${FlexCenter};
  flex-direction: column;

  letter-spacing: 1.5px;
  font-size: 2.5rem;
  font-weight: bold;

  margin-bottom: 1rem;

  font-size: 2rem;

  @media ${TABLET} {
    font-size: 2.5rem;
  }

  .edit-name {
    cursor: pointer;
    font-size: 1.5rem;

    margin-left: 1rem;

    :hover {
      transform: scale(1.5);
    }
  }

  @media ${TABLET} {
    flex-direction: row;
  }
`;

// --------- modal clock-version button ---------
const ButtonClockSwitch = styled.button<TDarkMode>`
  border: none;
  background: none;

  color: white;

  .switch {
    margin-top: 5px;
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 1s;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.2s;
  }

  input:checked + .slider {
    background-color: ${(props) =>
      props.darkMode ? `${palette.lightPurple}` : `${palette.orange}`};
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

const InputBox = styled.input`
  color: ${palette.almostWhite};
  width: 100%;
  background: none;
  padding: 0;
  /* position: absolute; */
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: none;
  caret-color: black;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: normal;
  outline: none;
  text-align: center;
  border-bottom: 2px solid ${palette.almostWhite};
  padding: 1rem;
  caret-color: ${palette.almostWhite};
`;

const ErrorBox = styled.div`
  color: ${palette.orange};
  width: 100%;
  padding: 0;
  /* position: absolute; */
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: none;
  caret-color: black;
  font-weight: 500;
  line-height: normal;
  outline: none;
  text-align: center;
  margin: auto;
  margin-top: 1rem;
`;
