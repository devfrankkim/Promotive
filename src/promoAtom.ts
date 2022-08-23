import { atom, selector } from "recoil";

const timerCategory = atom({
  key: "category",
  default: ["pomodoroState", "shortBreakState", "longBreakState"],
});

export const defaultTimer = atom({
  key: "defaultTimer",
  default: "pomodoroState",
});

export const pomodoroState = atom({
  key: "timerPomodoroKey",
  default: 30 * 60 * 1000,
});

export const timeOption = selector({
  key: "timeOptionKey",
  get: ({ get }) => {
    const result = get(pomodoroState);
    // const timer = get(defaultTimer);

    // const result = timeOptionCategory.filter((item) => item === timer)[0];

    // console.log(result);

    return result;
  },
  // set: ({ set }, newValue) => {
  //   if (newValue === "pomodoroState") {
  //     set(pomodoroState, 30 * 60 * 1000);
  //   }
  //   if (newValue === "shortBreakState") {
  //     set(pomodoroState, 5 * 60 * 1000);
  //   }
  //   if (newValue === "longBreakState") {
  //     set(pomodoroState, 60 * 60 * 1000);
  //   }
  // },
});

// export const shortBreakState = atom({
//   key: "timerShortBreakStateKey",
//   default: 5 * 60 * 1000,
// });

// export const longBreakState = atom({
//   key: "timerLongBreakStateKey",
//   default: 60 * 60 * 1000,
// });
