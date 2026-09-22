import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useLanguage } from "../hooks/useLanguage";
import { ThemeProvider } from "../theme/ThemeProvider";

import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import "../global.css";
import "../i18n";

export default function RootLayout() {
  useLanguage();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
