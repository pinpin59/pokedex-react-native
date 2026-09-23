import { SVGVolume } from "@/svg";
import { useAudioPlayer } from "expo-audio";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import SVG from "../ui/svgComponent";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type PokemonCryProps = {
  cry: string;
};

export const PokemonCry = ({ cry }: PokemonCryProps) => {
  const player = useAudioPlayer(cry);
  const { t } = useTranslation();

  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  const handlePlay = () => {
    player.pause();
    player.seekTo(0);

    requestAnimationFrame(() => {
      player.play();
    });

    scale.value = withSequence(withSpring(0.8), withSpring(1));

    rotation.value = withSequence(
      withTiming(-15, { duration: 80 }),
      withTiming(15, { duration: 80 }),
      withTiming(-10, { duration: 80 }),
      withTiming(10, { duration: 80 }),
      withTiming(0, { duration: 80 }),
    );
  };

  return (
    <AnimatedPressable
      onPress={handlePlay}
      style={animatedStyle}
      accessibilityRole="button"
      accessibilityLabel={t("accessibility.playCry")}
    >
      <SVG icon={SVGVolume} width={30} height={30} color="#FFF" />
    </AnimatedPressable>
  );
};
