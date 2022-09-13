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

import Header from "layouts/Header";
import Footer from "layouts/Footer";
import ErrorPage from "pages/ErrorPage";

function App() {
  const isDark = useRecoilValue(darkLightMode);

  useEffect(() => {
    localStorage.setItem(ISDARK, JSON.stringify(isDark));
  }, [isDark]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <ResetGlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Momentum />} />
        <Route path="pomodoro" element={<Pomodoro />} />
        <Route path="scheduler" element={<DND />} />
        <Route path="forecast" element={<WeatherForeCast />} />
        <Route path="weather" element={<Weather />} />
        <Route path="toDo" element={<ToDoList />} />
        <Route path="*" element={<ErrorPage />} />
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
