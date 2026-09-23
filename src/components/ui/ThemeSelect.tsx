import { SVGMoon, SVGSun } from "@/svg";
import { pokemonColors } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import SVG from "../ui/svgComponent";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ThemeSelect() {
  const { theme, setTheme, colors } = useTheme();

  const isDark = theme === "dark";

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateX: translateX.value }],
  }));

  return (
    <AnimatedPressable
      onPress={() => setTheme(isDark ? "light" : "dark")}
      onPressIn={() => {
        scale.value = withSpring(0.85);
        translateX.value = withSpring(-5);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
        translateX.value = withSpring(0);
      }}
      className="h-10 w-10 items-center justify-center rounded-full"
      style={[
        {
          backgroundColor: colors.grayscale.white,
        },
        animatedStyle,
      ]}
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
    </AnimatedPressable>
  );
}
