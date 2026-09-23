import { SVGLangage } from "@/svg";
import { useTheme } from "@/theme/useTheme";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useLanguage } from "../../hooks/useLanguage";
import SVG from "./svgComponent";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function LanguageSelect() {
  const { language, setLanguage } = useLanguage();
  const { colors } = useTheme();

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateX: translateX.value }],
  }));

  return (
    <View>
      <AnimatedPressable
        onPress={() => setLanguage(language === "fr" ? "en" : "fr")}
        onPressIn={() => {
          scale.value = withSpring(0.85);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        className="h-10 w-10 items-center justify-center rounded-full"
        style={[
          {
            backgroundColor: colors.grayscale.white,
          },
          animatedStyle,
        ]}
      >
        <SVG
          icon={SVGLangage}
          width={20}
          height={20}
          color={colors.foreground}
          strokeWidth={1}
        />
      </AnimatedPressable>
    </View>
  );
}
