import { DNDTODO, IArrayAtom } from "recoil/DnDToDoAtom";

const handleDNDtodoLocalStorage = (result: IArrayAtom[]) => {
  return localStorage.setItem(DNDTODO, JSON.stringify(result));
};

export default handleDNDtodoLocalStorage;
