import ThemeSelect from "@/components/ui/ThemeSelect";
import { useTheme } from "@/theme/useTheme";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

export default function Index() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <View style={{ backgroundColor: colors.background }} className="flex-1 ">
      <ScrollView className="flex-1" contentContainerClassName="flex-grow">
        <View className="flex-1 p-5 mt-10">
          <Text
            style={{ color: colors.foreground }}
            className="text-2xl font-bold "
          >
            Pokédex
          </Text>
          <ThemeSelect />
        </View>
      </ScrollView>
    </View>
  );
}
