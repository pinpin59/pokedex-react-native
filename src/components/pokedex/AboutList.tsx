import { SVGStraighten, SVGWeight } from "@/svg";
import { useTheme } from "@/theme/useTheme";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import SVG from "../ui/svgComponent";

type AboutListProps = {
  data: {
    details: {
      weight: number;
      height: number;
    };
    moves: {
      name: string;
    }[];
  };
};

export const AboutList = ({ data }: AboutListProps) => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();

  const isFrench = i18n.language === "fr";

  // PokeAPI:
  // weight → hectograms (hg)
  // height → decimeters (dm)

  const weight = isFrench
    ? `${(data.details.weight / 10).toFixed(1)} `
    : `${((data.details.weight / 10) * 2.20462).toFixed(1)}`;

  const height = isFrench
    ? `${(data.details.height / 10).toFixed(1)} m`
    : `${((data.details.height / 10) * 3.28084).toFixed(1)}`;

  return (
    <View className="w-full flex-row">
      {/* Weight */}
      <View className="flex-1 items-center justify-center">
        <View className="h-14 w-full items-center justify-center">
          <View className="flex-row items-center justify-center gap-2">
            <SVG
              icon={SVGWeight}
              width={25}
              height={25}
              color={colors.foreground}
            />

            <Text style={{ color: colors.foreground }} className="text-body-1">
              {weight} {t("cardPokemon.weightUnit")}
            </Text>
          </View>
        </View>

        <Text
          style={{ color: colors.foreground }}
          className="mt-2 text-center text-subtitle-2"
        >
          {t("cardPokemon.weight")}
        </Text>

        {/* Border */}
        <View
          className="absolute bottom-2 right-1 top-2 w-px"
          style={{ backgroundColor: colors.grayscale.light }}
        />
      </View>

      {/* Height */}
      <View className="flex-1 items-center justify-center">
        <View className="h-14 w-full items-center justify-center">
          <View className="flex-row items-center justify-center gap-2">
            <SVG
              icon={SVGStraighten}
              width={25}
              height={25}
              color={colors.foreground}
            />

            <Text style={{ color: colors.foreground }} className="text-body-1">
              {height} {t("cardPokemon.heightUnit")}
            </Text>
          </View>
        </View>

        <Text
          style={{ color: colors.foreground }}
          className="mt-2 text-center text-subtitle-2"
        >
          {t("cardPokemon.height")}
        </Text>

        {/* Border */}
        <View
          className="absolute bottom-2 right-1 top-2 w-px"
          style={{ backgroundColor: colors.grayscale.light }}
        />
      </View>

      {/* Moves */}
      <View className="flex-1 items-center justify-center">
        <View className="h-14 w-full items-center justify-center">
          {data.moves.slice(0, 2).map((move) => (
            <Text
              key={move.name}
              style={{ color: colors.foreground }}
              className="text-center text-body-1 capitalize"
            >
              {move.name}
            </Text>
          ))}
        </View>

        <Text
          style={{ color: colors.foreground }}
          className="mt-2 text-center text-subtitle-2"
        >
          {t("cardPokemon.moves")}
        </Text>
      </View>
    </View>
  );
};
