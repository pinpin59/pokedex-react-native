import { useTheme } from "@/theme/useTheme";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

interface PaginationProps {
  page: number;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

export default function Pagination({
  page,
  onPrevious,
  onNext,
  className = "",
}: PaginationProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const isFirstPage = page <= 1;

  return (
    <View className={`flex-row items-center justify-between  ${className}`}>
      <Pressable
        onPress={onPrevious}
        disabled={isFirstPage}
        hitSlop={15}
        className={`px-5 py-3 rounded-full flex-row items-center justify-center ${
          isFirstPage ? "opacity-50" : "opacity-100"
        }`}
        style={{ backgroundColor: isFirstPage ? "#A0AEC0" : colors.primary }}
      >
        <Text className="text-white font-bold text-sm">
          {t("pagination.previous")}
        </Text>
      </Pressable>

      <View
        className="w-11 h-11 rounded-full items-center justify-center"
        style={{
          borderWidth: 2,
          borderColor: colors.primary,
          backgroundColor: colors.background,
        }}
      >
        <Text
          className="font-bold text-base"
          style={{ color: colors.foreground }}
        >
          {page}
        </Text>
      </View>

      <Pressable
        onPress={onNext}
        hitSlop={15}
        className="px-5 py-3 rounded-full flex-row items-center justify-center"
        style={{ backgroundColor: colors.primary }}
      >
        <Text className="text-white font-bold text-sm">
          {t("pagination.next")}
        </Text>
      </Pressable>
    </View>
  );
}
