import { useTheme } from "@/theme/useTheme";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Stats = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

export const StatsList = ({ data, color }: { data: Stats; color: string }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View className="w-full">
      {Object.entries(data).map(([name, value]) => {
        return (
          <StatRow
            key={name}
            name={name}
            value={value}
            color={color}
            colors={colors}
            accessibilityLabel={t(`accessibility.${name}`)}
            label={t(`stats.${name}`)}
          />
        );
      })}
    </View>
  );
};

type StatRowProps = {
  name: string;
  value: number;
  color: string;
  label: string;
  colors: ReturnType<typeof useTheme>["colors"];
  accessibilityLabel: string;
};

const StatRow = ({
  value,
  color,
  label,
  colors,
  name,
  accessibilityLabel,
}: StatRowProps) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(Math.min(value / 255, 1), {
      duration: 800,
    });
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View className="flex-row items-center py-2">
      {/* Nom */}
      <View
        style={{
          width: 70,
          borderRightWidth: 1,
          borderRightColor: colors.grayscale.medium,
          paddingRight: 8,
        }}
      >
        <Text
          style={{ color: colors.foreground }}
          className="text-subtitle-1 uppercase"
          accessibilityLabel={accessibilityLabel}
        >
          {label}
        </Text>
      </View>

      {/* Valeur */}
      <Text
        style={{
          width: 35,
          paddingLeft: 8,
          color: colors.foreground,
        }}
        className="text-body-1"
      >
        {value}
      </Text>

      {/* Barre */}
      <View
        style={{
          width: 150,
          height: 8,
          marginLeft: 8,
          backgroundColor: colors.grayscale.light,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={[
            {
              height: 8,
              backgroundColor: color,
              borderRadius: 4,
            },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
};
