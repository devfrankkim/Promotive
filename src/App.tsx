import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import styled, { ThemeProvider } from "styled-components";
import ResetGlobalStyle from "./ResetGlobalStyle";

import { darkTheme, lightTheme } from "./styles/theme";
import { useRecoilValue } from "recoil";
import { darkLightMode, ISDARK } from "./recoil/DnDToDoAtom";

import Weather from "pages/WeatherMyLocation";
import DarkMode from "components/DarkMode";
import Pomodoro from "components/Pomodoro";

import ToDoList from "./pages/ToDoList";
import DND from "./pages/DND";
import Momentum from "pages/Momentum";
import WeatherForeCast from "pages/WeatherForeCast";

import Footer from "layouts/Footer";

function App() {
  const isDark = useRecoilValue(darkLightMode);

  useEffect(() => {
    localStorage.setItem(ISDARK, JSON.stringify(isDark));
  }, [isDark]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <ResetGlobalStyle />
      <DarkMode />

      <Routes>
        <Route path="/" element={<WeatherForeCast />} />
        <Route path="momentum" element={<Momentum />} />
        <Route path="weather" element={<Weather />} />
        <Route path="pomodoro" element={<Pomodoro />} />
        <Route path="DND" element={<DND />} />
        <Route path="toDo" element={<ToDoList />} />
      </Routes>
    </ThemeProvider>
  );
}

const SFooter = styled.footer`
  margin-top: 15rem;
  width: 100%;
  display: grid;
  justify-content: center;
  z-index: 999999;
`;
export default App;
