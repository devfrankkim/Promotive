import React, { useEffect, useState, useCallback } from "react";

import {
  pomodoroState,
  shortBreakState,
  longBreakState,
  beginState,
} from "utils/constants/pomodoro";

const Pomodoro = () => {
  const [defaultTimer, setDefaultTimer] = useState("begin");

  const [beginTimer, setBeginTimer] = useState(beginState);
  const [pomoTimer, setPomoTimer] = useState(pomodoroState);
  const [shortTimer, setShortTimer] = useState(shortBreakState);
  const [longTimer, setLongTimer] = useState(longBreakState);
  // const [beginTimer, setBeginTimer] = useRecoilState(beginState);
  // const [pomoTimer, setPomoTimer] = useRecoilState(pomodoroState);
  // const [shortTimer, setShortTimer] = useRecoilState(shortBreakState);
  // const [longTimer, setLongTimer] = useRecoilState(longBreakState);

  const [timeText, setTimeText] = useState("");
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);

  const [pomoInput, setPomoInput] = useState(pomoTimer);
  const [shorBreakInput, setShorBreakInput] = useState(shortTimer);
  const [longBreakInput, setLongBreakInput] = useState(longTimer);

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  // ========== convert milliseconds to readable time ==========
  const convertMsToHM = useCallback((milliseconds: number) => {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
      seconds
    )}`;
  }, []);

  // ========== update the timer ==========
  const calculateTimer = useCallback(() => {
    if (!isPause) {
      if (defaultTimer === "begin") {
        if (Number(beginTimer) === 0) {
          setTimeText("00:00:00");
          return;
        }
        if (Number(beginTimer) > 0) {
          Number(setBeginTimer((prev) => Number(prev) - 1000));
        }
      }

      if (defaultTimer === "pomo") {
        if (Number(pomoTimer) === 0) {
          setTimeText("00:00:00");
          return;
        }
        if (Number(pomoTimer) > 0) {
          Number(setPomoTimer((prev) => Number(prev) - 1000));
        }
      }

      if (defaultTimer === "short") {
        if (Number(shortTimer) === 0) {
          setTimeText("00:00:00");
          return;
        }
        if (Number(shortTimer) > 0) {
          Number(setShortTimer((prev) => Number(prev) - 1000));
        }
      }

      if (defaultTimer === "long") {
        if (Number(longTimer) === 0) {
          setTimeText("00:00:00");
          return;
        }
        if (Number(longTimer) > 0) {
          Number(setLongTimer((prev) => Number(prev) - 1000));
        }
      }
    }
  }, [
    defaultTimer,
    isPause,
    setPomoInput,
    setShorBreakInput,
    setLongBreakInput,
  ]);

  //  ======== Convert timer ========
  useEffect(() => {
    if (defaultTimer === "begin") {
      if (beginTimer > 0) {
        const time = convertMsToHM(beginTimer);

        setTimeText(time);
      }

      if (Number(beginTimer) === 0) {
        setTimeText("00:00:00");
        return;
      }
    }

    if (defaultTimer === "pomo") {
      if (pomoTimer > 0) {
        const time = convertMsToHM(pomoTimer);

        setTimeText(time);
      }

      if (Number(pomoTimer) === 0) {
        setTimeText("00:00:00");
        return;
      }
    }

    if (defaultTimer === "short") {
      if (Number(shortTimer) > 0) {
        const time = convertMsToHM(Number(shortTimer));
        setTimeText(time);
      }

      if (Number(shortTimer) === 0) {
        setTimeText("00:00:00");
        return;
      }
    }

    if (defaultTimer === "long") {
      if (Number(longTimer) > 0) {
        const time = convertMsToHM(Number(longTimer));
        setTimeText(time);
      }

      if (Number(longTimer) === 0) {
        setTimeText("00:00:00");
        return;
      }
    }
  }, [
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
    if (isStart) {
      let intervalId = setInterval(calculateTimer, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isStart, calculateTimer]);

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
    <div>
      <div>
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

        <button>Setting</button>
      </div>
      <div>
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
      </div>
      <div>
        <hr />
        <input
          type="number"
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
      </div>
      <div>
        <hr />
        <input
          type="number"
          onChange={(e) => {
            setShorBreakInput(Number(e.target.value));
          }}
          value={shorBreakInput}
        />
        <button
          name="shortBreakState"
          onClick={(e) => {
            onHandleSettingForTimer(e);
            onHandleTimerCategory(e);
          }}
        >
          Set Short Break
        </button>
      </div>
      <div>
        <hr />
        <input
          type="number"
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
      </div>
    </div>
  );
};

export default Pomodoro;
