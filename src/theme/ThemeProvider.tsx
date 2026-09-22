import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { colors, ThemeColors, ThemeName } from "./colors";

const THEME_KEY = "@pokedex_theme";

type ThemePreference = "light" | "dark" | "system";

type ThemeContextType = {
  theme: ThemePreference;
  colors: ThemeColors;
  setTheme: (theme: ThemePreference) => Promise<void>;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const [theme, setThemeState] = useState<ThemePreference>("light");

  const resolvedTheme: ThemeName =
    theme === "system"
      ? Appearance.getColorScheme() === "dark"
        ? "dark"
        : "light"
      : theme;

  useEffect(() => {
    loadTheme();
  }, []);

  async function loadTheme() {
    const savedTheme = await AsyncStorage.getItem(THEME_KEY);

    if (
      savedTheme === "light" ||
      savedTheme === "dark" ||
      savedTheme === "system"
    ) {
      setThemeState(savedTheme);
    }
  }

  async function setTheme(theme: ThemePreference) {
    setThemeState(theme);
    await AsyncStorage.setItem(THEME_KEY, theme);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors: colors[resolvedTheme],
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
