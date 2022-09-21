import { DNDTODO, IArrayAtom } from "recoil/DnDToDoAtom";

export const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

//  ============ DND Local Storage  ============
export const handleDNDtodoLocalStorage = (result: IArrayAtom[]) => {
  return localStorage.setItem(DNDTODO, JSON.stringify(result));
};

//  ============ Pomodoro Local Storage  ============

export interface IPomodoro {
  beginState: number;
  pomodoroState: number;
  shortBreakState: number;
  longBreakState: number;
}

export const TIMEKEY = "TIMEKEY";

export const TIMESTATE = JSON.parse(localStorage.getItem(TIMEKEY) as any) || {
  beginState: 30 * 60 * 1000,
  pomodoroState: 30,
  shortBreakState: 5,
  longBreakState: 60,
};

export const handlePomodorotodoLocalStorage = (result: IPomodoro) => {
  return localStorage.setItem(TIMEKEY, JSON.stringify(result));
};

//  ============ Momentum Local Storage  ============

export const MOMENTUM_NAME = "MOMENTUM";
export const CLOCK_VERSION = "clock_version";

export const handleMomentumNameLocalStorage = (result: string) => {
  return localStorage.setItem(MOMENTUM_NAME, JSON.stringify(result));
};

export const handleClockVersionLocalStorage = (result: number): number => {
  localStorage.setItem(CLOCK_VERSION, JSON.stringify(result));
  return result;
};

//  ============ Weather dt_txt  ============

export const handleDtText = (result: string): string => {
  switch (result.split(" ")[1]) {
    case "00:00:00":
      return "12AM";
    case "03:00:00":
      return "3AM";
    case "06:00:00":
      return "6AM";
    case "09:00:00":
      return "9AM";
    case "12:00:00":
      return "12PM";
    case "15:00:00":
      return "3PM";
    case "18:00:00":
      return "6PM";
    case "21:00:00":
      return "9PM";
    default:
  }
  return result;
};
