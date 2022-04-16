import { createContext } from "react";

// implementing dark theme light theme by context api
export const themes = {
  dark: "dark-content",
  light: "",
};

export const sidebarTheme = {
  sideBar: "sidebar",
  noSideBar: "",
};

export const ThemeContext = createContext({
  theme: themes.dark,
  changeTheme: () => {},
  sideBar: () => {},
});
