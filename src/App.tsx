import ResetGlobalStyle from "./ResetGlobalStyle";
import ToDoList from "./components/ToDoList";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { useRecoilValue } from "recoil";
import { darkLightMode, ISDARK } from "./atom";
import { useEffect } from "react";

function App() {
  const isDark = useRecoilValue(darkLightMode);

  useEffect(() => {
    localStorage.setItem(ISDARK, JSON.stringify(isDark));
  }, [isDark]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <ResetGlobalStyle />
      <ToDoList />
    </ThemeProvider>
  );
}

export default App;
