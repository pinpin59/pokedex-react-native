import { useTheme } from "@/theme/useTheme";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

interface PaginationProps {
  page: number;
  onPrevious: () => void;
  onNext: () => void;
}

const Pagination = ({ page, onPrevious, onNext }: PaginationProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <Pressable disabled={page === 1} onPress={onPrevious}>
        <Text
          style={{
            color: page === 1 ? colors.grayscale.medium : colors.primary,
          }}
        >
          {t("pagination.previous")}
        </Text>
      </Pressable>

      <Text style={{ color: colors.foreground }}>{page}</Text>

      <Pressable onPress={onNext}>
        <Text style={{ color: colors.foreground }}>{t("pagination.next")}</Text>
      </Pressable>
    </View>
  );
};

export default Pagination;
