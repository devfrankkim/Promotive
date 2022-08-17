import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { useRecoilValue } from "recoil";
import ResetGlobalStyle from "./ResetGlobalStyle";

import DarkMode from "./components/DarkMode";

import ToDoList from "./pages/ToDoList";
import DND from "./pages/DND";

import { darkLightMode, ISDARK } from "./atom";

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
        <Route path="/" element={<DND />} />
        <Route path="/toDo" element={<ToDoList />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
