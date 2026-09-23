import { useTheme } from "@/theme/useTheme";
import { ActivityIndicator, View } from "react-native";

export const Spinner = () => {
  const { colors } = useTheme();

  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};
