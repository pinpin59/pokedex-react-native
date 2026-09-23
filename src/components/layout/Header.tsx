import { SVGPokeball } from "@/svg";
import { t } from "i18next";
import { Text, View } from "react-native";
import SVG from "../ui/svgComponent";
import ThemeSelect from "../ui/ThemeSelect";

export const Header = () => {
  return (
    <>
      {/* Header */}
      <View className="flex-row items-center">
        <SVG icon={SVGPokeball} width={30} height={30} />

        <Text
          accessibilityRole="header"
          className="ml-4 text-headline text-white"
        >
          {t("header.pokedex")}
        </Text>

        <View className="ml-auto">
          <ThemeSelect />
        </View>
      </View>
    </>
  );
};
