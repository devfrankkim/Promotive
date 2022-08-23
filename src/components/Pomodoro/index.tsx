import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pomodoroState, timeOption, defaultTimer } from '../../promoAtom';

const Pomodoro = () => {
  const clockRef = useRef(null);
  // const [timeTest, setTimeTest] = useRecoilState(timeOption);
  const [timer, setTimer] = useRecoilState(pomodoroState);
  console.log(timer);

  // const [defaultOption, setDefaultOption] = useRecoilState(defaultTimer);

  // console.log(defaultOption);

  // const [timer, setTimer] = useRecoilState(pomodoroState);
  const [pomoTimer, setPomoTimer] = useRecoilState(pomodoroState);
  const [timeText, setTimeText] = useState('');
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);

  ///////////
  const [pomoInput, setPomoInput] = useState('');

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
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
      if (Number(timer) === 0) {
        setTimeText('00:00:00');
        return;
      }

      if (Number(timer) > 0) {
        Number(setPomoTimer((prev) => Number(prev) - 1000));
      }
    }
  }, [isPause, Number(timer), setPomoTimer]);

  useEffect(() => {
    if (!isPause) {
      if (Number(timer) > 0) {
        const time = convertMsToHM(Number(timer));
        setTimeText(time);
      }

      if (Number(timer) === 0) {
        setTimeText('00:00:00');
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

  const onHandleTimerCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPause(false);
    const targetName = e.currentTarget.name;
    const keys = ['pomodoroState', 'shortBreakState', 'longBreakState'];
    if (keys.includes(targetName)) {
      const times: { [key: string]: number } = {
        pomodoroState: pomoTimer,
        shortBreakState: 5,
        longBreakState: 60,
      };
      setTimer(times[targetName] * 60 * 1000);
    }
  };

  const onHandleSettingForTimer = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('clicked');
    const n = parseInt(pomoInput);
    if (!isNaN(n)) {
      setPomoTimer(n);
    }
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
      </div>
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
      <div>
        <hr />
        <input
          type="number"
          onChange={(e) => {
            setPomoInput(e.target.value);
          }}
          value={pomoInput}
        />
        <button name="pomodoSetTime" onClick={onHandleSettingForTimer}>
          Set Pomodoro
        </button>
      </div>
    </div>
  );
};

export default React.memo(Pomodoro);
