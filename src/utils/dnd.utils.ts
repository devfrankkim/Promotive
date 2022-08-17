import { DNDTODO, IArrayAtom } from "../atom";

const handleDNDtodoLocalStorage = (result: IArrayAtom[]) => {
  return localStorage.setItem(DNDTODO, JSON.stringify(result));
};

export default handleDNDtodoLocalStorage;
