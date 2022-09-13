import React, { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { modalPomodoro } from "recoil/modal";
import { useRecoilValue } from "recoil";

import styled from "styled-components";

import { AiFillSetting } from "react-icons/ai";
import { RiChatDeleteLine } from "react-icons/ri";
import { BiReset } from "react-icons/bi";
import { BsFillAlarmFill } from "react-icons/bs";

import {
  handlePomodorotodoLocalStorage,
  padTo2Digits,
  TIMEKEY,
  TIMESTATE,
} from "utils/helpers";
import { TABLET } from "utils/responsiveness";
import {
  BEGIN,
  LONG,
  LONG_BREAK_STATE,
  POMO,
  POMODORO_STATE,
  SHORT,
  SHORT_BREAK_STATE,
} from "utils/constants/pomodoro";
import { FlexCenter, palette, palettePomodoro } from "styles/styles";
import { darkLightMode } from "recoil/DnDToDoAtom";
import { TDarkMode } from "types";

const Pomodoro = () => {
  const isDarkMode = useRecoilValue(darkLightMode);

  const [isOpen, setIsOpen] = useRecoilState(modalPomodoro);

  const [defaultTimer, setDefaultTimer] = useState(BEGIN);

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

    return hours === 0
      ? `${padTo2Digits(minut1s)}:${padTo2Digits(seconds)}`
      : `${padTo2Digits(hours)}:${padTo2Digits(minut1s)}:${padTo2Digits(
          seconds
        )}`;
  }, []);

  // ========== update the timer ==========
  const calculateTimer = useCallback(() => {
    if (!isPause) {
      if (defaultTimer === BEGIN) {
        if (Number(beginTimer) > 0) {
          Number(setBeginTimer((prev) => Number(prev) - 1000));
          return;
        }

        if (Number(beginTimer) === 0) {
          setIsPause(true);
          return;
        }
      }

      if (defaultTimer === POMO) {
        if (Number(pomoTimer) > 0) {
          Number(setPomoTimer((prev) => Number(prev) - 1000));
          return;
        }

        if (Number(pomoTimer) === 0) {
          setIsPause(true);
          return;
        }
      }

      if (defaultTimer === SHORT) {
        if (Number(shortTimer) > 0) {
          Number(setShortTimer((prev) => Number(prev) - 1000));
          return;
        }

        if (Number(shortTimer) === 0) {
          setIsPause(true);
          return;
        }
      }

      if (defaultTimer === LONG) {
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

  //  ======== Handle Save Setting Timer ========
  const onHandleSaveSetting = useCallback(() => {
    setDefaultTimer(POMO);

    setPomoTimer(Number(pomoInput) * 60 * 1000);
    setShortTimer(Number(shorBreakInput) * 60 * 1000);
    setLongTimer(Number(longBreakInput) * 60 * 1000);

    handlePomodorotodoLocalStorage({
      beginState: Number(pomoInput) * 60 * 1000,
      pomodoroState: Number(pomoInput),
      shortBreakState: Number(shorBreakInput),
      longBreakState: Number(longBreakInput),
    });
  }, [pomoInput, shorBreakInput, longBreakInput]);

  //  ======== Convert timer ========
  useEffect(() => {
    const JSON_TIMESTATE = JSON.parse(localStorage.getItem(TIMEKEY) as any);

    if (defaultTimer === BEGIN) {
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

    if (defaultTimer === POMO) {
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

    if (defaultTimer === SHORT) {
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

    if (defaultTimer === LONG) {
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
    beginTimer,
    pomoTimer,
    shortTimer,
    longTimer,
    isPause,
    defaultTimer,
    convertMsToHM,
    setPomoInput,
    setShorBreakInput,
    setLongBreakInput,
    onHandleSaveSetting,
  ]);

  //  ======== Start timer ========
  useEffect(() => {
    if (isStart && !isPause) {
      let intervalId = setInterval(calculateTimer, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isStart, calculateTimer, isPause]);

  // ========= Default Category Time Text ==========
  const onHandleTimerCategory = (targetName: string) => {
    setIsPause(true);

    const keys = [POMODORO_STATE, SHORT_BREAK_STATE, LONG_BREAK_STATE];

    if (keys.includes(targetName)) {
      switch (targetName) {
        case POMODORO_STATE:
          setDefaultTimer(POMO);
          setPomoTimer(Number(pomoInput) * 60 * 1000);
          break;
        case SHORT_BREAK_STATE:
          setDefaultTimer(SHORT);
          setShortTimer(Number(shorBreakInput) * 60 * 1000);
          break;
        case LONG_BREAK_STATE:
          setDefaultTimer(LONG);
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

  // =========== Handle Reset Timer ===========
  const onHandleResetTimer = () => {
    setIsPause(true);
    setIsStart(false);

    const categoryName: { [key: string]: string } = {
      [BEGIN]: POMODORO_STATE,
      [POMO]: POMODORO_STATE,
      [SHORT]: SHORT_BREAK_STATE,
      [LONG]: LONG_BREAK_STATE,
    };
    onHandleTimerCategory(categoryName[defaultTimer] || "");
  };

  return (
    <FramerWrapper onClick={() => setIsOpen(false)}>
      <WrapperBox>
        <FirstBox darkMode={isDarkMode}>
          <BoxTop>
            {/* ========= START BUTTON ========= */}
            <TopButton
              darkMode={isDarkMode}
              type="button"
              onClick={() => {
                setIsPause(false);
                setIsStart(true);
              }}
            >
              START
            </TopButton>
            {/* ========= PAUSE BUTTON ========= */}
            <TopButton
              darkMode={isDarkMode}
              type="button"
              onClick={() => {
                setIsStart(false);
                setIsPause(true);
              }}
            >
              PAUSE
            </TopButton>
          </BoxTop>
          <div onClick={(e) => e.stopPropagation()}>
            {/* ========= Timer ========= */}
            <TimeText>{timeText}</TimeText>

            <SettingIcons darkMode={isDarkMode}>
              {/* ========= Alarm BUTTON ========= */}
              <BsFillAlarmFill className="icon-button" />

              {/* ========= RESET BUTTON ========= */}
              <BiReset
                className="reset-button icon-button"
                type="button"
                onClick={onHandleResetTimer}
              />
              <AiFillSetting
                className="setting-button icon-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen((prev) => !prev);
                }}
              />
            </SettingIcons>
          </div>

          {/* ========= Setting BUTTON ========= */}
          <div onClick={() => setIsOpen(false)}>
            {/* ============ modal ============ */}
            {isOpen && (
              <ModalWrapper onClick={(e) => e.stopPropagation()}>
                <div className="top">
                  <h2>Timer Settings (minutes)</h2>
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
                    <h3>Set Pomodoro</h3>
                    <InputTimer
                      autoFocus
                      type="number"
                      min={1}
                      onChange={(e) => {
                        setPomoInput(Number(e.target.value));
                      }}
                      value={pomoInput}
                    />
                  </WrapperInputTimer>

                  <WrapperInputTimer>
                    <h3>Set Short Break</h3>
                    <InputTimer
                      type="number"
                      min={1}
                      onChange={(e) => {
                        setShorBreakInput(Number(e.target.value));
                      }}
                      value={shorBreakInput}
                    />
                  </WrapperInputTimer>

                  <WrapperInputTimer>
                    <h3>Set Long Break</h3>
                    <InputTimer
                      type="number"
                      min={1}
                      onChange={(e) => {
                        setLongBreakInput(Number(e.target.value));
                      }}
                      value={longBreakInput}
                    />
                  </WrapperInputTimer>

                  <div className="save-button">
                    <button onClick={onHandleSaveSetting}>SAVE</button>
                  </div>
                </ContainerWrapperInputTimer>
              </ModalWrapper>
            )}
          </div>
        </FirstBox>
        {/* =================== Pomodoro & Short Break & Long Break =================== */}
      </WrapperBox>
      <FramePomodoro onClick={(e) => e.stopPropagation()}>
        <ButtonOffPomodoro
          active={defaultTimer === BEGIN || defaultTimer === POMO}
          type="button"
          name={POMODORO_STATE}
          onClick={(e) => onHandleTimerCategory(e.currentTarget.name)}
        >
          Pomodoro
        </ButtonOffPomodoro>
        <ButtonOffPomodoro
          active={defaultTimer === SHORT}
          type="button"
          name={SHORT_BREAK_STATE}
          onClick={(e) => onHandleTimerCategory(e.currentTarget.name)}
        >
          Short Break
        </ButtonOffPomodoro>
        <ButtonOffPomodoro
          active={defaultTimer === LONG}
          type="button"
          name={LONG_BREAK_STATE}
          onClick={(e) => onHandleTimerCategory(e.currentTarget.name)}
        >
          Long Break
        </ButtonOffPomodoro>
      </FramePomodoro>
    </FramerWrapper>
  );
};

export default Pomodoro;

const SettingIcons = styled.div<TDarkMode>`
  ${FlexCenter}
  gap: 1.5rem;
  font-size: 1.3rem;
  cursor: pointer;

  .reset-button {
    font-size: 2.5rem;
  }
  .setting-button {
    font-size: 1.5rem;
  }

  .icon-button {
    :hover {
      color: ${(props) =>
        props.darkMode ? `${palette.darkPurple};` : `${palette.orange}`};
      transition: ease-in-out 0.2s;
      opacity: 0.8;
      transform: scale(1.5);
    }
  }
`;
const FramerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;

  .whiteTextColor {
    color: ${palettePomodoro.textColor};
  }
`;
const WrapperBox = styled.div`
  ${FlexCenter}
  gap: 2rem;
  align-items: center;

  position: relative;
  text-align: center;
  color: ${palettePomodoro.textColor};

  top: 120px;
`;

const TopButton = styled.button<TDarkMode>`
  background: ${(props) =>
    props.darkMode ? `${palette.darkPurple}` : `${palette.orangeGradient}`};

  border-radius: 11px;
  border: none;

  cursor: pointer;
  color: ${palettePomodoro.textColor};

  width: 150px;
  height: 48px;
  left: 653.5px;
  top: 268px;

  font-size: 1.5rem;
  font-weight: bold;
  line-height: 48px;
  text-align: center;

  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: ease-in-out 0.2s;

  :hover {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const TimeText = styled.h2`
  height: 206px;
  left: 469px;
  top: 384px;
  font-weight: 600;
  font-size: 170px;
  line-height: 206px;

  text-align: center;
  margin: 2rem 0;
`;

const BoxTop = styled.div`
  ${FlexCenter}
`;

const FirstBox = styled.div<TDarkMode>`
  ${FlexCenter};
  flex-direction: column;

  position: relative;
  width: 952px;
  height: 455px;

  background: ${(props) => props.theme.backgroudPomodoro};
  box-shadow: 4px 8px 25px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
`;

const FramePomodoro = styled.div`
  ${FlexCenter};
  gap: 1rem;
  width: 100%;
  pointer-events: auto;
  padding: 48px 0px;
  position: absolute;
  bottom: 2rem;
  border-radius: 16px;
`;

const ButtonOffPomodoro = styled.button<{ active: Boolean }>`
  background: ${(props) =>
    props.active ? `${palette.orangeGradient}` : `${palette.lightPurple}`};
  box-shadow: 4px 8px 25px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 16px;
  cursor: pointer;

  color: ${palettePomodoro.textColor};

  width: 268px;
  height: 65px;
  left: 876px;
  top: 818px;
  font-size: 1.2rem;

  :hover {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const ModalWrapper = styled.div`
  color: ${palette.darkPurple};
  border-radius: 8px;
  background-color: white;
  /* position: relative; */
  max-width: 400px;
  width: 95%;
  height: 525px;
  z-index: 9999999;
  border-top: 1px solid rgb(239, 239, 239);
  border-bottom: 1px solid rgb(239, 239, 239);
  margin: auto;
  transition: all 0.2s ease-in 0s;
  transform: translateY(20px);
  box-shadow: rgb(0 0 0 / 15%) 0px 10px 20px, rgb(0 0 0 / 10%) 0px 3px 6px;
  position: absolute;
  top: 5rem;
  padding: 3rem;

  .top {
    padding: 1rem 0;
  }

  .closeButton {
    position: absolute;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    top: 2rem;
    right: 1.5rem;
    color: ${palette.orange};
  }

  hr {
    border: 2px solid;
  }

  h2 {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    text-align: left;
  }

  h3 {
    text-align: left;
    width: 100%;
    margin-bottom: 0.4rem;
    font-weight: bold;
  }

  .save-button {
    width: 100%;
    text-align: left;
  }

  button {
    width: 112px;
    height: 40px;

    cursor: pointer;
    background: ${palette.orange};
    border-radius: 10px;
    border: none;
    color: #fff;
  }
`;

const ContainerWrapperInputTimer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  padding: 1rem 0;
  width: 100%;
  gap: 2rem;
`;

const WrapperInputTimer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  button {
    background: none;
    border: 1px solid black;
    cursor: pointer;

    :hover {
      transition: all 0.1s ease-in 0s;
    }
  }
`;

const InputTimer = styled.input`
  border-radius: 4px;
  background: #e5e3ec;
  box-shadow: inset 1px 2px 4px rgba(0, 0, 0, 0.25);
  font-size: 16px;
  padding: 10px;
  box-shadow: none;
  border: none;
  color: rgb(85, 85, 85);
  width: 100%;
  box-sizing: border-box;
  /* outline: none; */
`;

const ButtonSettingContainer = styled.div`
  cursor: pointer;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  border: 1px solid black;
  gap: 2px;
  position: absolute;
  height: 2rem;
  right: 6.5rem;

  border-radius: 34px;
  justify-content: center;

  @media ${TABLET} {
    right: 13rem;
    width: 90px;
    height: 34px;
  }
`;
