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
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/40"
        onPress={onClose}
      >
        <Pressable
          className="w-[80%] rounded-3xl p-5"
          style={{ backgroundColor: colors.grayscale.white }}
          onPress={(event) => event.stopPropagation()}
        >
          <Text
            className="text-subtitle-1 mb-4"
            style={{ color: colors.foreground }}
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
            accessibilityState={{ selected: sortBy === "name" }}
          >
            <View
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
            accessibilityState={{ selected: sortBy === "number" }}
          >
            <View
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
              className="ml-3 text-body-1"
              style={{ color: colors.foreground }}
            >
              {t("sort.number")}
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
