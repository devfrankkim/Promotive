import { atom } from "recoil";

export const modalPomodoro = atom({
  key: "modalPomodoroSetting",
  default: false,
});

export const defaultTimer = atom({
  key: "defaultTimer",
  default: "pomodoroState",
});

export const beginState = atom({
  key: "timerBeginKey",
  default: 30 * 60 * 1000,
});

export const pomodoroState = atom({
  key: "timerPomodoroKey",
  default: 30,
});

export const shortBreakState = atom({
  key: "timerShortBreakKey",
  default: 5,
});

export const longBreakState = atom({
  key: "timerLongBreakKey",
  default: 60,
});
