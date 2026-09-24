import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Header } from "@/components/layout/Header";
import { CardPokemon } from "@/components/pokedex/CardPokemon";
import { CardPokemonSkeleton } from "@/components/pokedex/CardPokemonSkeleton";
import Pagination from "@/components/pokedex/Pagination";
import { SearchBar } from "@/components/pokedex/searchBar";

import { usePokemons } from "@/hooks/usePokemons";
import i18n from "@/i18n";
import { useTheme } from "@/theme/useTheme";

export default function Index() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { language } = i18n;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchBySort, setSearchBySort] = useState<"name" | "number">("number");

  const { data, isLoading, isError } = usePokemons(page, language);

  const filteredData = data
    ?.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
        pokemon.id.toString().includes(search),
    )
    .sort((a, b) => {
      if (searchBySort === "name") {
        return a.name.localeCompare(b.name);
      }
      return a.id - b.id;
    });

  const renderContent = () => {
    if (isError) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text style={{ color: colors.foreground }}>{t("common.error")}</Text>
        </View>
      );
    }

    if (isLoading) {
      return (
        <FlatList
          className="mt-5 px-2"
          data={Array.from({ length: 15 })}
          numColumns={3}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          columnWrapperStyle={{ marginBottom: 12 }}
          renderItem={() => (
            <View className="w-1/3 items-center">
              <CardPokemonSkeleton />
            </View>
          )}
        />
      );
    }

    return (
      <FlatList
        className="mt-5 px-2"
        data={filteredData}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        columnWrapperStyle={{ marginBottom: 12 }}
        renderItem={({ item }) => (
          <Pressable
            className="w-1/3 items-center"
            accessibilityRole="button"
            accessibilityLabel={t("accessibility.viewPokemon", {
              name: item.name,
            })}
            onPress={() => router.push(`/pokemon/${item.id}`)}
          >
            <CardPokemon Pokemon={item} />
          </Pressable>
        )}
      />
    );
  };
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{
        backgroundColor: colors.primary,
      }}
      className="flex-1"
    >
      {/* Header + SearchBar */}
      <View className="px-5 mt-4">
        <Header />
        <SearchBar
          search={search}
          onSearchChange={setSearch}
          onSort={setSearchBySort}
        />
      </View>

      <View
        style={{ backgroundColor: colors.background }}
        className="flex-1 rounded-t-[40px] overflow-hidden mt-6 pt-4 flex-col justify-between"
      >
        <View className="flex-1">{renderContent()}</View>

        <View
          style={{
            borderTopColor: colors.grayscale.medium,
            backgroundColor: colors.grayscale.light,
            paddingBottom: Math.max(insets.bottom, 24),
            paddingTop: 24,
            paddingHorizontal: 24,
          }}
        >
          <Pagination
            page={page}
            onPrevious={() => setPage((prev) => Math.max(1, prev - 1))}
            onNext={() => setPage((prev) => prev + 1)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
