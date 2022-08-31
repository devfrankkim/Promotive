import { atom } from "recoil";

export const modalPomodoro = atom({
  key: "modalPomodoroSetting",
  default: false,
});

export const modalClockVersion = atom({
  key: "modalClockVersionSetting",
  default: false,
});
