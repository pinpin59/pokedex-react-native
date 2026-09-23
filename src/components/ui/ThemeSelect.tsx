import { SVGMoon, SVGSun } from "@/svg";
import { pokemonColors } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { Pressable } from "react-native";
import SVG from "../ui/svgComponent";

export default function ThemeSelect() {
  const { theme, setTheme, colors } = useTheme();

  const isDark = theme === "dark";

  return (
    <Pressable
      onPress={() => setTheme(isDark ? "light" : "dark")}
      className="h-10 w-10 items-center justify-center rounded-full"
      style={{
        backgroundColor: colors.grayscale.white,
      }}
      accessibilityRole="switch"
      accessibilityLabel="Changer de thème"
      accessibilityState={{ checked: isDark }}
    >
      {isDark ? (
        <SVG icon={SVGMoon} width={22} height={22} color={colors.primary} />
      ) : (
        <SVG
          icon={SVGSun}
          width={22}
          height={22}
          color={pokemonColors.electric}
        />
      )}
      {/* <SVG
        icon={isDark ? SVGMoon : SVGSun}
        width={22}
        height={22}
        color={colors.primary}
      /> */}
    </Pressable>
  );
}
