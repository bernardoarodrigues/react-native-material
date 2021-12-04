import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, defaultTheme, Theme } from "./theme";
import { PortalProvider } from "../Portal";

export interface ThemeProviderProps {
  theme?: Theme;
}

export const ThemeContext = createContext<Theme>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  const colorScheme = useColorScheme();
  return (
    <ThemeContext.Provider value={theme ?? (colorScheme === "dark" ? darkTheme : defaultTheme)}>
      <PortalProvider>{children}</PortalProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
