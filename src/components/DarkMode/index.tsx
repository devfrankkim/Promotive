import React from "react";
import { useSetRecoilState } from "recoil";
import { darkLightMode } from "../../atom";

const DarkMode = () => {
  const setDarkMode = useSetRecoilState(darkLightMode);
  return (
    <button onClick={() => setDarkMode((prev: any) => !prev)}>
      dark/light
    </button>
  );
};

export default DarkMode;
