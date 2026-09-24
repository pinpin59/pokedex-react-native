import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { useEffect, useState } from "react";
import i18n from "../i18n";

const LANGUAGE_KEY = "@pokedex_language";

export type Language = "fr" | "en";

function getDeviceLanguage(): Language {
  const deviceLanguage = getLocales()[0]?.languageCode;
  if (deviceLanguage === "en") {
    return "en";
  }

  return "fr";
}

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(
    i18n.language as Language,
  );

  useEffect(() => {
    loadLanguage();
  }, []);

  async function loadLanguage() {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);

    const selectedLanguage: Language =
      savedLanguage === "fr" || savedLanguage === "en"
        ? savedLanguage
        : getDeviceLanguage();

    await i18n.changeLanguage(selectedLanguage);
    setLanguageState(selectedLanguage);
  }

  async function setLanguage(language: Language) {
    await i18n.changeLanguage(language);
    await AsyncStorage.setItem(LANGUAGE_KEY, language);

    setLanguageState(language);
  }

  return {
    language,
    setLanguage,
  };
}
