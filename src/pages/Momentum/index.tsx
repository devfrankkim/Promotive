import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { clockState, ClockVersionState, getTime } from "recoil/clock";
import { modalClockVersion } from "recoil/modal";

import { AiOutlineClockCircle } from "react-icons/ai";

import styled from "styled-components";

import useCloseOutside from "hooks/useCloseOutside";

import {
  CLOCK_VERSION,
  handleClockVersionLocalStorage,
  handleMomentumNameLocalStorage,
  momentumLocalName,
} from "utils/helpers";
import { useCallback } from "react";
import { boxShadow, FlexCenter, palette } from "styles/styles";
import { darkLightMode } from "recoil/DnDToDoAtom";
import { TDarkMode } from "types";
import { TABLET } from "utils/responsiveness";

type TMomentumRegister = {
  momentumRegisterForm: string;
};

const MOMENTTUM_REGISTER = "momentumRegisterForm";

const Momentum = () => {
  const isDarkMode = useRecoilValue(darkLightMode);

  const [isOpen, setIsOpen] = useRecoilState(modalClockVersion);

  const domNode = useCloseOutside(() => {
    setIsOpen(false);
  });

  const [momentumName, setMomentumName] = useState(momentumLocalName);
  const [clockVersion, setClockVersion] = useRecoilState(ClockVersionState);
  const [timeState, setTimeState] = useRecoilState(clockState);

  // =========== useForm ===========
  const {
    register,
    handleSubmit,
    setValue,

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

    // ------ clear the value ------
    setValue(MOMENTTUM_REGISTER, "");
  };

  return (
    <Wrapper>
      <Container darkMode={isDarkMode}>
        <TimeContainer darkMode={isDarkMode}>
          <div className="time">{timeState[0]}</div>
          <div
            className="time-setting-modal"
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsOpen(false);
            }}
          >
            <span ref={domNode}>
              <button
                className="clock-setting"
                onClick={(e) => {
                  setIsOpen((prev) => !prev);
                }}
              >
                <AiOutlineClockCircle />
              </button>

              {isOpen && (
                <ButtonClockSwitch>
                  <span>24-hour clock</span>
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
          {timeState[1]} {momentumName}.
        </TextDiv>

        <form onSubmit={handleSubmit(handleValid)}>
          <InputBox
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
            placeholder={"what's your name?"}
            defaultValue={momentumName}
          />
          <ErrorSpan>{errors?.momentumRegisterForm?.message}</ErrorSpan>
        </form>
      </Container>
    </Wrapper>
  );
};

export default Momentum;

const TimeContainer = styled.div<TDarkMode>`
  ${FlexCenter};

  .time-setting-modal {
    /* position: absolute; */
    /* right: 100px; */

    /* @media ${TABLET} {
      right: 100px;
    } */
  }

  .time {
    font-size: 3rem;
    margin-right: 1rem;
  }

  .clock-setting {
    font-size: 1rem;
    cursor: pointer;
    background: none;
    border: none;
    color: ${(props) => props.theme.darkBG};

    :hover {
      transition: ease-in-out 0.2s;
      opacity: 0.8;
      transform: scale(1.5);
      outline: none;
    }
  }
`;

const Container = styled.div<TDarkMode>`
  ${boxShadow.type1};
  color: ${(props) => props.theme.darkBG};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: radial-gradient(rgba(255, 255, 255, 0.49), #9198e5);
  border: 1px solid rgba(255, 255, 255, 0.3);

  border-radius: 70px;

  width: 500px;
  height: 425px;

  @media ${TABLET} {
    width: 900px;
    height: 525px;
  }
`;

const Wrapper = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
  padding: 1rem;
`;

const ButtonClockSwitch = styled.button`
  background: none;
  border: 1px black solid;

  .switch {
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
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
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

const ErrorSpan = styled.span`
  color: red;
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
`;

const TextDiv = styled.span`
  /* padding-bottom: 15px;
  line-height: 1.2;
  white-space: normal;
  caret-color: black;
  color: red; */
`;

const InputBox = styled.input`
  color: red;
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
  border-bottom: 1px solid black;
`;
