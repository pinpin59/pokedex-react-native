import { SVGPokeball } from "@/svg";
import { t } from "i18next";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import LanguageSelect from "../ui/LanguageSelect";
import SVG from "../ui/svgComponent";
import ThemeSelect from "../ui/ThemeSelect";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Header = () => {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotation.value}deg`,
      },
    ],
  }));

  const handlePokeballPress = () => {
    rotation.value = 0;

    rotation.value = withTiming(900, {
      duration: 1200,
      easing: Easing.inOut(Easing.ease),
    });
  };

  return (
    <View className="flex-row items-center">
      <AnimatedPressable
        onPress={handlePokeballPress}
        style={animatedStyle}
        accessible={false}
      >
        <SVG icon={SVGPokeball} width={30} height={30} />
      </AnimatedPressable>

      <Text
        accessibilityRole="header"
        className="ml-4 text-headline text-white"
      >
        {t("header.pokedex")}
      </Text>

      <View className="ml-auto flex-row items-center gap-3">
        <LanguageSelect />
        <ThemeSelect />
      </View>
    </View>
  );
};
