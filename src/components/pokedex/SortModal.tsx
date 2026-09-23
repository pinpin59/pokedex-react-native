import { useTheme } from "@/theme/useTheme";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, Text, View } from "react-native";

type SortBy = "name" | "number";

type SortModalProps = {
  visible: boolean;
  onSortChange: (sortBy: SortBy) => void;
  onClose: () => void;
};

export const SortModal = ({
  visible,
  onSortChange,
  onClose,
}: SortModalProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState<SortBy>("number");

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      accessibilityViewIsModal
    >
      <View className="flex-1 items-center justify-center bg-black/40">
        {/* Backdrop */}
        <Pressable
          className="absolute inset-0"
          onPress={onClose}
          accessible={false}
        />

        {/* Modal content */}
        <View
          className="w-[80%] rounded-3xl p-5"
          style={{ backgroundColor: colors.grayscale.white }}
        >
          <Text
            className="mb-4 text-subtitle-1"
            style={{ color: colors.foreground }}
            accessibilityRole="header"
          >
            {t("sort.title")}
          </Text>

          {/* Name */}
          <Pressable
            onPress={() => {
              setSortBy("name");
              onSortChange("name");
              onClose();
            }}
            className="flex-row items-center py-3"
            accessibilityRole="radio"
            accessibilityLabel={t("sort.name")}
            accessibilityState={{
              selected: sortBy === "name",
            }}
          >
            <View
              accessible={false}
              className="h-5 w-5 items-center justify-center rounded-full border-2"
              style={{ borderColor: colors.primary }}
            >
              {sortBy === "name" && (
                <View
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                />
              )}
            </View>

            <Text
              accessible={false}
              className="ml-3 text-body-1"
              style={{ color: colors.foreground }}
            >
              {t("sort.name")}
            </Text>
          </Pressable>

          {/* Number */}
          <Pressable
            onPress={() => {
              setSortBy("number");
              onSortChange("number");
              onClose();
            }}
            className="flex-row items-center py-3"
            accessibilityRole="radio"
            accessibilityLabel={t("sort.number")}
            accessibilityState={{
              selected: sortBy === "number",
            }}
          >
            <View
              accessible={false}
              className="h-5 w-5 items-center justify-center rounded-full border-2"
              style={{ borderColor: colors.primary }}
            >
              {sortBy === "number" && (
                <View
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                />
              )}
            </View>

            <Text
              accessible={false}
              className="ml-3 text-body-1"
              style={{ color: colors.foreground }}
            >
              {t("sort.number")}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
