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
import { LAPTOP, TABLET } from "utils/responsiveness";
import {
  BEGIN,
  LONG,
  LONG_BREAK_STATE,
  POMO,
  POMODORO_STATE,
  SHORT,
  SHORT_BREAK_STATE,
} from "utils/constants/pomodoro";
import { boxShadow, FlexCenter, palette, palettePomodoro } from "styles/styles";
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
  // ${FlexCenter};
  // gap: 1.5rem;

  cursor: pointer;

  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  grid-gap: 2rem;

  font-size: 1.2rem;

  .reset-button {
    font-size: 2rem;
  }

  .setting-button {
    font-size: 1.3rem;
  }

  .icon-button {
    :hover {
      color: ${(props) =>
        props.darkMode ? `${palette.darkPurple};` : "#f55064"};
      transition: ease-in-out 0.2s;
      opacity: 0.8;
      transform: scale(1.5);
    }
  }

  @media ${TABLET} {
    font-size: 1.3rem;

    .reset-button {
      font-size: 3rem;
    }

    .setting-button {
      font-size: 1.5rem;
    }
  }
`;
const FramerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .whiteTextColor {
    color: ${palettePomodoro.textColor};
  }
`;
const WrapperBox = styled.div`
  ${FlexCenter}

  align-items: center;
  position: relative;
  text-align: center;
  color: ${palettePomodoro.textColor};

  top: 120px;
`;

const BoxTop = styled.div`
  ${FlexCenter}

  display: grid;
  justify-content: center;
  align-items: center;
  grid-auto-flow: column;
  grid-gap: 1rem;
`;

const TopButton = styled.button<TDarkMode>`
  background: ${(props) =>
    props.darkMode ? `${palette.darkPurple}` : `${palette.orangeGradient}`};

  border-radius: 5px;
  border: none;

  cursor: pointer;
  color: ${palettePomodoro.textColor};

  /* width: 80px; */

  left: 653.5px;
  top: 268px;
  font-size: 0.75rem;
  font-weight: bold;
  text-align: center;

  padding: 0.3rem 1rem;

  transition: ease-in-out 0.2s;

  :hover {
    opacity: 0.8;
    transform: scale(1.05);
  }

  @media ${TABLET} {
    font-size: 1.2rem;
    width: 150px;
    height: 48px;
    left: 653.5px;
    top: 268px;
    border-radius: 7px;
  }

  @media ${TABLET} {
    font-size: 1.4rem;
    border-radius: 11px;
  }
`;

const TimeText = styled.h2`
  left: 469px;
  top: 384px;

  font-size: 85px;
  font-weight: 600;

  text-align: center;
  margin: 2rem 0;

  @media ${TABLET} {
    font-size: 170px;
    line-height: 206px;
  }
`;

const FirstBox = styled.div<TDarkMode>`
  ${FlexCenter};
  flex-direction: column;
  position: relative;

  background: ${(props) => props.theme.backgroudPomodoro};
  box-shadow: 4px 8px 25px rgba(0, 0, 0, 0.25);
  border-radius: 30px;

  width: 95%;
  height: 350px;

  @media ${TABLET} {
    width: 652px;
    height: 455px;
  }

  @media ${LAPTOP} {
    width: 952px;
  }
`;

const FramePomodoro = styled.div`
  /* gap not working on safari */
  /* ${FlexCenter}; */
  /* gap: 1rem; */

  width: 100%;
  pointer-events: auto;
  padding: 48px 0px;
  border-radius: 16px;

  position: relative;
  bottom: -8rem;

  display: grid;
  grid-gap: 0.8rem;

  justify-content: center;
  align-items: center;

  @media ${TABLET} {
    grid-auto-flow: column;
    bottom: -7rem;
  }

  @media ${LAPTOP} {
    grid-gap: 2rem;
    bottom: -9rem;
  }
`;

const ButtonOffPomodoro = styled.button<{ active: Boolean }>`
  ${boxShadow.type13};

  background: ${(props) =>
    props.active ? `${palette.orangeGradient}` : `${palette.lightPurple}`};

  border: none;
  border-radius: 10px;
  cursor: pointer;

  color: ${palettePomodoro.textColor};

  width: 168px;
  height: 45px;
  left: 876px;
  top: 818px;
  font-size: 0.8rem;
  font-weight: bold;

  :hover {
    opacity: 0.8;
    transform: scale(1.05);
  }

  @media ${TABLET} {
    width: 198px;
    height: 45px;
    left: 876px;
    top: 818px;
    font-size: 1rem;
    border-radius: 13px;
  }

  @media ${LAPTOP} {
    width: 268px;
    height: 65px;
    left: 876px;
    top: 818px;
    font-size: 1.2rem;
    border-radius: 16px;
  }
`;

const ModalWrapper = styled.div`
  ${boxShadow.type13};

  color: ${palette.darkPurple};
  border-radius: 8px;
  background-color: white;

  width: 300px;
  height: 400px;

  z-index: 9999999;
  border-top: 1px solid rgb(239, 239, 239);
  border-bottom: 1px solid rgb(239, 239, 239);

  margin: auto;

  transition: all 0.2s ease-in 0s;
  transform: translateY(20px);

  position: absolute;
  top: 1.2rem;
  padding: 1.5rem;

  right: 0.2rem;

  @media ${TABLET} {
    max-width: 400px;
    width: 95%;
    height: 525px;
    padding: 3rem;
    right: 0.5rem;
  }

  .top {
    padding: 0.4rem 0;

    @media ${TABLET} {
      padding: 1rem 0;
    }
  }

  .closeButton {
    position: absolute;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    top: 1.5rem;
    right: 1rem;
    color: ${palette.orange};

    :hover {
      transition: ease-in-out 0.2s;
      transform: scale(1.3);
    }

    @media ${TABLET} {
      font-size: 1.5rem;
      top: 2rem;
      right: 1.5rem;
    }
  }

  hr {
    border: 1px solid;

    @media ${TABLET} {
      border: 2px solid;
    }
  }

  h2 {
    font-size: 17px;
    font-weight: 700;
    line-height: 29px;
    text-align: left;

    @media ${TABLET} {
      font-size: 20px;
    }
  }

  h3 {
    text-align: left;
    width: 100%;
    margin-bottom: 0.3rem;
    font-weight: bold;

    @media ${TABLET} {
      margin-bottom: 0.4rem;
    }
  }

  .save-button {
    width: 100%;
    text-align: left;
  }

  button {
    width: 80px;
    height: 30px;

    font-size: 0.8rem;
    cursor: pointer;
    background: ${palette.orange};
    border-radius: 5px;
    border: none;
    color: #fff;

    @media ${TABLET} {
      font-size: 1rem;
      width: 112px;
      height: 40px;
      border-radius: 10px;
    }

    :hover {
      background: ${palette.orangeGradient};
      transition: ease-in-out 0.2s;
      transform: scale(1.05);
    }
  }
`;

const ContainerWrapperInputTimer = styled.div`
  display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
  display: -ms-flexbox; /* TWEENER - IE 10 */
  display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
  display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;

  padding: 1rem 0;
  width: 100%;

  /* gap: 2rem; */
`;

const WrapperInputTimer = styled.div`
  display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
  display: -ms-flexbox; /* TWEENER - IE 10 */
  display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
  display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  margin-bottom: 1rem;

  font-size: 0.9rem;

  @media ${TABLET} {
    margin-bottom: 2rem;
    font-size: 1rem;
  }

  button {
    background: none;
    border: 1px solid black;
    cursor: pointer;

    :hover {
      transition: all 0.1s ease-in 0s;
    }

    @media ${TABLET} {
    }
  }
`;

const InputTimer = styled.input`
  border-radius: 4px;
  background: #e5e3ec;
  box-shadow: inset 1px 2px 4px rgba(0, 0, 0, 0.25);
  font-size: 13px;
  padding: 10px;
  box-shadow: none;
  border: none;
  color: rgb(85, 85, 85);
  width: 100%;

  @media ${TABLET} {
    font-size: 16px;
  }
`;
