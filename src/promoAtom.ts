import { atom, selector } from "recoil";

export const defaultTimer = atom({
  key: "defaultTimer",
  default: "pomodoroState",
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

export const timeOption = selector({
  key: "timeOptionKey",
  get: ({ get }) => {
    const result = get(pomodoroState);
    return result;
  },
});

export const timeSelector = selector({
  key: "timeSelectorKey",
  get: ({ get }) => {
    const result = get(pomodoroState);

    return result;
  },
});
