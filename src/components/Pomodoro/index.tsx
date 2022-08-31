import React, { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { modalPomodoro } from "recoil/modal";
import styled from "styled-components";

import { FiSettings } from "react-icons/fi";
import { RiChatDeleteLine } from "react-icons/ri";

import {
  handlePomodorotodoLocalStorage,
  padTo2Digits,
  TIMEKEY,
  TIMESTATE,
} from "utils/helpers";
import { TABLET } from "utils/responsiveness";

const Pomodoro = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalPomodoro);

  const [defaultTimer, setDefaultTimer] = useState("begin");

  const [beginTimer, setBeginTimer] = useState<number>(TIMESTATE.beginState);
  const [pomoTimer, setPomoTimer] = useState<number>(TIMESTATE.pomodoroState);
  const [shortTimer, setShortTimer] = useState<number>(
    TIMESTATE.shortBreakState
  );
  const [longTimer, setLongTimer] = useState<number>(TIMESTATE.longBreakState);

  const [timeText, setTimeText] = useState("");
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);

  const [pomoInput, setPomoInput] = useState(pomoTimer);
  const [shorBreakInput, setShorBreakInput] = useState(shortTimer);
  const [longBreakInput, setLongBreakInput] = useState(longTimer);

  // ========== convert milliseconds to readable time ==========
  const convertMsToHM = useCallback((milliseconds: number) => {
    let seconds = Math.floor(milliseconds / 1000);
    let minut1s = Math.floor(seconds / 60);
    let hours = Math.floor(minut1s / 60);

    seconds = seconds % 60;
    minut1s = minut1s % 60;

    return `${padTo2Digits(hours)}:${padTo2Digits(minut1s)}:${padTo2Digits(
      seconds
    )}`;
  }, []);

  // ========== update the timer ==========
  const calculateTimer = useCallback(() => {
    if (!isPause) {
      if (defaultTimer === "begin") {
        if (Number(beginTimer) > 0) {
          Number(setBeginTimer((prev) => Number(prev) - 1000));
          return;
        }

        if (Number(beginTimer) === 0) {
          setIsPause(true);
          return;
        }
      }

      if (defaultTimer === "pomo") {
        if (Number(pomoTimer) > 0) {
          Number(setPomoTimer((prev) => Number(prev) - 1000));
          return;
        }

        if (Number(pomoTimer) === 0) {
          setIsPause(true);
          return;
        }
      }

      if (defaultTimer === "short") {
        if (Number(shortTimer) > 0) {
          Number(setShortTimer((prev) => Number(prev) - 1000));
          return;
        }

        if (Number(shortTimer) === 0) {
          setIsPause(true);
          return;
        }
      }

      if (defaultTimer === "long") {
        if (Number(longTimer) > 0) {
          Number(setLongTimer((prev) => Number(prev) - 1000));
          return;
        }

        if (Number(longTimer) === 0) {
          setIsPause(true);
          return;
        }
      }
    }
  }, [defaultTimer, isPause, beginTimer, longTimer, pomoTimer, shortTimer]);

  //  ======== Convert timer ========
  useEffect(() => {
    const JSON_TIMESTATE = JSON.parse(localStorage.getItem(TIMEKEY) as any);

    if (defaultTimer === "begin") {
      if (beginTimer > 0) {
        const time = convertMsToHM(beginTimer);

        setTimeText(time);
      }
      if (Number(beginTimer) <= 0) {
        setBeginTimer(JSON_TIMESTATE.beginState);
        alert("Finished!");
        setIsPause(true);
        return;
      }
    }

    if (defaultTimer === "pomo") {
      if (pomoTimer > 0) {
        const time = convertMsToHM(pomoTimer);

        setTimeText(time);
      }
      if (Number(pomoTimer) <= 0) {
        setPomoTimer(JSON_TIMESTATE.pomodoroState * 60 * 1000);
        alert("Finished!");
        setIsPause(true);
        return;
      }
    }

    if (defaultTimer === "short") {
      if (Number(shortTimer) > 0) {
        const time = convertMsToHM(Number(shortTimer));
        setTimeText(time);
      }

      if (Number(shortTimer) <= 0) {
        setShortTimer(JSON_TIMESTATE.shortBreakState * 60 * 1000);
        alert("Finished!");
        setIsPause(true);
        return;
      }
    }

    if (defaultTimer === "long") {
      if (Number(longTimer) > 0) {
        const time = convertMsToHM(Number(longTimer));
        setTimeText(time);
      }

      if (Number(longTimer) <= 0) {
        setLongTimer(JSON_TIMESTATE.longBreakState * 60 * 1000);
        alert("Finished!");
        setIsPause(true);
        return;
      }
    }
  }, [
    setLongBreakInput,
    beginTimer,
    pomoTimer,
    shortTimer,
    longTimer,
    isPause,
    convertMsToHM,
    defaultTimer,
    setPomoInput,
    setShorBreakInput,
    setLongBreakInput,
  ]);

  //  ======== start timer ========
  useEffect(() => {
    if (isStart && !isPause) {
      let intervalId = setInterval(calculateTimer, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isStart, calculateTimer, isPause]);

  // ========= default category time ==========
  const onHandleTimerCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPause(true);

    const targetName = e.currentTarget.name;
    const keys = ["pomodoroState", "shortBreakState", "longBreakState"];

    if (keys.includes(targetName)) {
      switch (targetName) {
        case "pomodoroState":
          setDefaultTimer("pomo");

          setPomoTimer(Number(pomoInput) * 60 * 1000);
          break;
        case "shortBreakState":
          setDefaultTimer("short");

          setShortTimer(Number(shorBreakInput) * 60 * 1000);
          break;
        case "longBreakState":
          setDefaultTimer("long");

          setLongTimer(Number(longBreakInput) * 60 * 1000);
          break;
        default:
      }
    }

    handlePomodorotodoLocalStorage({
      beginState: Number(pomoInput) * 60 * 1000,
      pomodoroState: Number(pomoInput),
      shortBreakState: Number(shorBreakInput),
      longBreakState: Number(longBreakInput),
    });
  };

  const onHandleSettingForTimer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const stateName = e.currentTarget.name;

    switch (stateName) {
      case "pomodoroState":
        return Number(setPomoInput(pomoInput));
      case "shortBreakState":
        return Number(setShorBreakInput(shorBreakInput));
      case "longBreakState":
        return Number(setLongBreakInput(longBreakInput));
      default:
    }

    onHandleTimerCategory(e);
  };

  return (
    <div onClick={() => setIsOpen(false)}>
      <ButtonSettingContainer
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <FiSettings />
        <div>Setting</div>
      </ButtonSettingContainer>

      <div onClick={() => setIsOpen(false)}>
        {/* ============ modal ============ */}
        {isOpen && (
          <ModalWrapper onClick={(e) => e.stopPropagation()}>
            <div className="top">
              <h2>Timer Setting</h2>
              <RiChatDeleteLine
                className="closeButton"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <hr />
            <ContainerWrapperInputTimer
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsOpen(false);
              }}
            >
              <WrapperInputTimer>
                <InputTimer
                  autoFocus
                  type="number"
                  min={1}
                  onChange={(e) => {
                    setPomoInput(Number(e.target.value));
                  }}
                  value={pomoInput}
                />
                <button
                  name="pomodoroState"
                  onClick={(e) => {
                    onHandleSettingForTimer(e);
                    onHandleTimerCategory(e);
                  }}
                >
                  Set Pomodoro
                </button>
              </WrapperInputTimer>
              <WrapperInputTimer>
                <InputTimer
                  type="number"
                  min={1}
                  onChange={(e) => {
                    setShorBreakInput(Number(e.target.value));
                  }}
                  value={shorBreakInput}
                />
                <button
                  name="shortBreakState"
                  onClick={(e) => {
                    if (shorBreakInput === 0) {
                      alert("set timer properly");
                      return;
                    }
                    onHandleSettingForTimer(e);
                    onHandleTimerCategory(e);
                  }}
                >
                  Set Short Break
                </button>
              </WrapperInputTimer>
              <WrapperInputTimer>
                <InputTimer
                  type="number"
                  min={1}
                  onChange={(e) => {
                    setLongBreakInput(Number(e.target.value));
                  }}
                  value={longBreakInput}
                />
                <button
                  name="longBreakState"
                  onClick={(e) => {
                    onHandleSettingForTimer(e);
                    onHandleTimerCategory(e);
                  }}
                >
                  Set Long Break
                </button>
              </WrapperInputTimer>
            </ContainerWrapperInputTimer>
          </ModalWrapper>
        )}

        <FramePomodoro>
          <span onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              name="pomodoroState"
              onClick={onHandleTimerCategory}
            >
              Pomodoro
            </button>
            <button
              type="button"
              name="shortBreakState"
              onClick={onHandleTimerCategory}
            >
              Short Break
            </button>
            <button
              type="button"
              name="longBreakState"
              onClick={onHandleTimerCategory}
            >
              Long Break
            </button>
          </span>
          <span onClick={(e) => e.stopPropagation()}>
            <h2>{timeText}</h2>

            <button
              type="button"
              onClick={() => {
                setIsPause(false);
                setIsStart(true);
              }}
            >
              Start Timer
            </button>
            <button
              type="button"
              onClick={() => {
                setIsStart(false);
                setIsPause(true);
              }}
            >
              Pause Timer
            </button>
          </span>
        </FramePomodoro>
      </div>
    </div>
  );
};

export default Pomodoro;

const ModalWrapper = styled.div`
  color: rgb(34, 34, 34);
  border-radius: 8px;
  background-color: white;
  /* position: relative; */
  max-width: 400px;
  width: 95%;
  height: 50vh;
  z-index: 2147483647;
  border-top: 1px solid rgb(239, 239, 239);
  border-bottom: 1px solid rgb(239, 239, 239);
  margin: auto;
  transition: all 0.2s ease-in 0s;
  transform: translateY(20px);
  box-shadow: rgb(0 0 0 / 15%) 0px 10px 20px, rgb(0 0 0 / 10%) 0px 3px 6px;
  overflow: hidden;
  position: absolute;
  top: 10rem;
  padding: 2rem;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }

  .closeButton {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.3rem;
  }

  h2 {
    display: block;
  }
`;

const ContainerWrapperInputTimer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const WrapperInputTimer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column-reverse;
  width: 80px;

  button {
    background: none;
    border: 1px solid black;
    cursor: pointer;

    :hover {
      color: red;
      transition: all 0.1s ease-in 0s;
    }
  }
`;

const InputTimer = styled.input`
  border-radius: 4px;
  background-color: rgb(239, 239, 239);
  font-size: 16px;
  padding: 10px;
  box-shadow: none;
  border: none;
  color: rgb(85, 85, 85);
  width: 100%;
  box-sizing: border-box;
  /* outline: none; */
`;

const FramePomodoro = styled.div`
  position: relative;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  pointer-events: auto;
  transition: all 0.2s ease-in 0s;
  overflow: hidden scroll;
  padding: 48px 0px;
  box-sizing: border-box;

  h2 {
    display: inline-block;
    width: 100%;
  }
`;

const ButtonSettingContainer = styled.div`
  cursor: pointer;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  border: 1px solid black;
  gap: 2px;
  position: absolute;

  z-index: 9999;
  position: fixed;
  height: 2rem;
  right: 6.5rem;
  top: 2rem;
  border-radius: 34px;
  justify-content: center;

  @media ${TABLET} {
    right: 13rem;
    width: 90px;
    height: 34px;
  }
`;
