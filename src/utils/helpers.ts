import { DNDTODO, IArrayAtom } from "recoil/DnDToDoAtom";

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
