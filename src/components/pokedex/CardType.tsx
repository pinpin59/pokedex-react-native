import { pokemonColors, PokemonType } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type CardTypeProps = {
  types: string[];
  className?: string;
};

export const CardType = ({ types, className }: CardTypeProps) => {
  const { t } = useTranslation();
  const colors = useTheme();
  const typeColors = types.map((type) => pokemonColors[type as PokemonType]);
  return (
    <View className={`${className} flex flex-row flex-wrap gap-4`}>
      {types.map((type) => (
        <View
          key={type}
          style={{ backgroundColor: pokemonColors[type as PokemonType] }}
          className="p-2 rounded-2xl mb-2"
        >
          <Text className="text-subtitle-2 capitalize text-white">
            {t(`type.${type}`)}
          </Text>
        </View>
      ))}
    </View>
  );
};
