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

export const handleClockVersionLocalStorage = (result: number) => {
  return localStorage.setItem(CLOCK_VERSION, JSON.stringify(result));
};

export const momentumLocalName =
  JSON.parse(localStorage.getItem(MOMENTUM_NAME) as any) ||
  handleMomentumNameLocalStorage(" ");
