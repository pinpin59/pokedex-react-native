import { useTheme } from "@/theme/useTheme";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export const CardPokemonSkeleton = () => {
  const { colors } = useTheme();

  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.8, {
        duration: 800,
      }),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      className="mt-1 w-[94%] rounded-2xl p-1"
      style={[
        {
          backgroundColor: colors.grayscale.background,
          shadowColor: "#000",
          shadowOffset: { width: 0.5, height: 0 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 3,
        },
        animatedStyle,
      ]}
    >
      {/* Overlay */}
      <View
        pointerEvents="none"
        className="absolute bottom-0 left-0 right-0 h-[40%] rounded-lg"
        style={{
          backgroundColor: colors.grayscale.light,
        }}
      />

      {/* ID */}
      <View className="mr-2 ml-auto mt-1 h-3 w-8 rounded-md bg-gray-300" />

      {/* Image */}
      <View className="items-center justify-center py-2">
        <View
          className="h-20 w-20 rounded-full"
          style={{
            backgroundColor: colors.grayscale.light,
          }}
        />
      </View>

      {/* Name */}
      <View className="mx-auto mb-1 mt-1 h-4 w-16 rounded-md bg-gray-300" />
    </Animated.View>
  );
};
