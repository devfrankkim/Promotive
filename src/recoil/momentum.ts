import { atom } from "recoil";
import { handleMomentumNameLocalStorage, MOMENTUM_NAME } from "utils/helpers";

export const MomentumState = atom({
  key: "momentumStateKey",
  default:
    JSON.parse(localStorage.getItem(MOMENTUM_NAME) as any) ||
    handleMomentumNameLocalStorage(" "),
});
