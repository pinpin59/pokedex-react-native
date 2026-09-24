import { SVGLangage } from "@/svg";
import { useTheme } from "@/theme/useTheme";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateX: translateX.value }],
  }));

  const nextLanguage = language === "fr" ? "en" : "fr";

  return (
    <View>
      <AnimatedPressable
        onPress={() => setLanguage(nextLanguage)}
        onPressIn={() => {
          scale.value = withSpring(0.85);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        style={[
          {
            backgroundColor: colors.grayscale.white,
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          },
          animatedStyle,
        ]}
        accessible
        accessibilityRole="button"
        accessibilityLabel={t("accessibility.changeLanguage")}
        accessibilityHint={t("accessibility.changeLanguageHint")}
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
