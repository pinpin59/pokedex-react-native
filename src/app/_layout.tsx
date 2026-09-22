import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useLanguage } from "../hooks/useLanguage";
import { ThemeProvider } from "../theme/ThemeProvider";

import "../global.css";
import "../i18n";

export default function RootLayout() {
  useLanguage();

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
