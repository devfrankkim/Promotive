import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { timeState } from "../../promoAtom";

const Pomodoro = () => {
  const clockRef = useRef(null);

  const [timer, setTimer] = useRecoilState(timeState);
  const [timeText, setTimeText] = useState("");
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);

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
      if (timer === 0) {
        setTimeText("00:00:00");
        return;
      }

      if (timer > 0) {
        setTimer((prev) => prev - 1000);
      }
    }
  }, [isPause, timer, setTimer]);

  useEffect(() => {
    if (!isPause) {
      if (timer > 0) {
        const time = convertMsToHM(timer);
        setTimeText(time);
      }

      if (timer === 0) {
        setTimeText("00:00:00");
        return;
      }
    }
  }, [timer, setTimer, isPause, convertMsToHM]);

  useEffect(() => {
    if (isStart) {
      let intervalId = setInterval(calculateTimer, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isStart, calculateTimer]);

  return (
    <div>
      <h2 ref={clockRef}>{timeText}</h2>
      <button
        type="button"
        onClick={() => {
          setIsStart(true);
          setIsPause(false);
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
  );
};

export default React.memo(Pomodoro);
