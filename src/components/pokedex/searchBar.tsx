import { SVGSearch, SVGTextFormat } from "@/svg";
import { useTheme } from "@/theme/useTheme";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, TextInput, View } from "react-native";
import SVG from "../ui/svgComponent";
import { SortModal } from "./SortModal";

type SearchBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onSort: (sortBy: "name" | "number") => void;
};
export const SearchBar = ({
  search,
  onSearchChange,
  onSort,
}: SearchBarProps) => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);

  return (
    <View className="mt-5 flex-row items-center gap-3">
      {/* Search */}
      <View className="relative flex-1">
        <SVG
          icon={SVGSearch}
          width={20}
          height={20}
          color={colors.primary}
          style={{
            position: "absolute",
            left: 12,
            top: 8,
            zIndex: 10,
          }}
        />

        <TextInput
          accessibilityLabel={t("header.search")}
          accessibilityHint={t("accessibility.searchHint")}
          accessibilityRole="search"
          className="h-10 rounded-3xl bg-white pl-10 pr-3"
          value={search}
          onChangeText={onSearchChange}
          placeholder={t("header.search")}

          placeholderTextColor={colors.grayscale.medium}
        />
      </View>

      {/* Filter */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t("accessibility.filter")}
        accessibilityHint={t("accessibility.filterHint")}
        className="h-10 w-10 items-center justify-center rounded-3xl bg-white"
        onPress={() => setIsSortModalVisible(true)}
      >
        <SVG
          icon={SVGTextFormat}
          width={22}
          height={22}
          color={colors.primary}
        />
      </Pressable>
      <SortModal
        visible={isSortModalVisible}

        onSortChange={(sortBy) => {
          // Handle sort change
          onSort(sortBy);
          setIsSortModalVisible(false);
        }}
        onClose={() => setIsSortModalVisible(false)}
      />
    </View>
  );
};
