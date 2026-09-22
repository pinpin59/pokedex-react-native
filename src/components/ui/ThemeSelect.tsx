import { useTheme } from "@/theme/useTheme";
import { Pressable, Text, View } from "react-native";

export default function ThemeSelect() {
  const { theme, setTheme } = useTheme();
  const { colors } = useTheme();

  return (
    <View>
      <Text style={{ color: colors.foreground }}>Thème actuel : {theme}</Text>

      <Pressable onPress={() => setTheme("light")}>
        <Text style={{ color: colors.foreground }}>☀️ Clair</Text>
      </Pressable>

      <Pressable onPress={() => setTheme("dark")}>
        <Text style={{ color: colors.foreground }}>🌙 Sombre</Text>
      </Pressable>

      <Pressable onPress={() => setTheme("system")}>
        <Text style={{ color: colors.foreground }}>⚙️ Système</Text>
      </Pressable>
    </View>
  );
}
