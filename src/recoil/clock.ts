import { atom } from "recoil";
import { CLOCK_VERSION, handleClockVersionLocalStorage } from "utils/helpers";

// =========== Get time & greet status ===========
export const getTime = (number: number) => {
  let hours: number | string | any = Number(new Date().getHours());
  let minutes: number | string = Number(new Date().getMinutes());

  let GREET = "";
  let TIME = "";

  if (6 < hours && hours < 12) {
    GREET = "Good Morning";
  } else if (12 < hours && hours < 18) {
    GREET = "Good Afternoon";
  } else {
    GREET = "Good Evening";
  }

  // *** 12:00 - 24:00 execption ***
  // ------- if not noon & mid night -------
  if (hours !== 24 && hours !== 12) {
    if (number === 12) {
      // 12-hour-lock option
      hours = `${hours % number}`;
    }

    // 24-hour-lock option
    if (number === 24) {
      hours = hours % number < 10 ? `0${hours}` : `${hours}`;
    }
  }

  // ------- noon - 12:00 -------
  if (hours === 12) {
    hours = 12;
  }

  // ------- Mid night - 00:00 or 24:00 -------
  if (hours === 24) {
    hours = number === 12 ? "00" : "24";
  }

  if (hours === "0") {
    hours = 12;
  }

  minutes = minutes < 10 ? `0${minutes}` : minutes;

  TIME = `${hours}:${minutes}`;

  return [TIME, GREET];
};

// =========== set clock-version(12 or 24) from local storage ===========
export const ClockVersionState = atom({
  key: "clockStateKey",
  default:
    JSON.parse(localStorage.getItem(CLOCK_VERSION) as any) ||
    handleClockVersionLocalStorage(24),
});

// =========== Get clock-version(12 or 24) ===========
const getLocalTime: any = JSON.parse(
  localStorage.getItem(CLOCK_VERSION) as any
);

// =========== Time state -> from getTime fn  ===========
export const clockState = atom({
  key: "clockKey",
  default: getTime(getLocalTime),
});
