import { Pressable, Text, View } from "react-native";
import { useLanguage } from "../../hooks/useLanguage";

export default function LanguageSelect() {
  const { language, setLanguage } = useLanguage();

  return (
    <View>
      <Text className="text-foreground">Langue</Text>

      <Pressable onPress={() => setLanguage("fr")}>
        <Text className="text-foreground">
          🇫🇷 Français {language === "fr" ? "✓" : ""}
        </Text>
      </Pressable>

      <Pressable onPress={() => setLanguage("en")}>
        <Text>🇬🇧 English {language === "en" ? "✓" : ""}</Text>
      </Pressable>
    </View>
  );
}
