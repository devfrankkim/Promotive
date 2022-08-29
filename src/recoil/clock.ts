import { atom } from "recoil";

export const getTime = (number: number = 12) => {
  let GREET = ``;

  let hours: number | string = new Date().getHours();
  let minutes: number | string = new Date().getMinutes();

  if (6 < hours && hours < 12) {
    GREET = "Good Morning";
  } else if (12 < hours && hours < 18) {
    GREET = "Good Afternoon";
  } else {
    GREET = "Good Evening";
  }

  // 24-hour-lock option
  hours = hours % number;

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const TIME = `${hours}:${minutes}`;

  return [TIME, GREET];
};

export const clockState = atom({
  key: "clockKey",
  default: getTime(),
});
