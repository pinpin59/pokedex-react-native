import { useTheme } from "@/theme/useTheme";
import { PokemonListItem } from "@/type";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";

export const CardPokemon = ({ Pokemon }: { Pokemon: PokemonListItem }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View
      className="mt-1 w-[94%] rounded-2xl p-1"
      style={{
        backgroundColor: colors.grayscale.background,
        shadowColor: "#000",
        shadowOffset: { width: 0.5, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
      }}
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
      <Text
        accessible={false}
        className="mr-2 text-right text-subtitle-3"
        style={{ color: colors.grayscale.medium }}
      >
        #{Pokemon.id}
      </Text>

      {/* Image */}
      <View accessible={false} className="items-center justify-center py-2">
        {Pokemon.image && (
          <Image
            source={{ uri: Pokemon.image }}
            className="h-20 w-20"
            resizeMode="contain"
            accessible={false}
          />
        )}
      </View>

      {/* Name */}
      <Text
        accessible={false}
        className="text-center text-subtitle-2 capitalize"
        style={{ color: colors.foreground }}
        numberOfLines={1}
      >
        {Pokemon.name}
      </Text>
    </View>
  );
};
