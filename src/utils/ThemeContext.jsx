import { createContext } from "react";

// implementing dark theme light theme by context api
export const themes = {
  dark: "",
  light: "white-content",
};

export const ThemeContext = createContext({
  theme: themes.dark,
  changeTheme: () => {},
});
