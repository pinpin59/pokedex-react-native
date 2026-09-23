import { useTheme } from "@/theme/useTheme";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

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
      {Object.entries(data).map(([name, value]) => (
        <View key={name} className="flex-row items-center py-2">
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
            >
              {t(`stats.${name}`)}
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
            <View
              style={{
                width: `${Math.min((value / 255) * 100, 100)}%`,
                height: 8,
                backgroundColor: color,
                borderRadius: 4,
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};
