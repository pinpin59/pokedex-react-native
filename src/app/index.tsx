import { Header } from "@/components/layout/Header";
import { CardPokemon } from "@/components/pokedex/CardPokemon";
import { CardPokemonSkeleton } from "@/components/pokedex/CardPokemonSkeleton";
import Pagination from "@/components/pokedex/Pagination";
import { SearchBar } from "@/components/pokedex/searchBar";
import { usePokemons } from "@/hooks/usePokemons";
import i18n from "@/i18n";
import { useTheme } from "@/theme/useTheme";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [page, setPage] = useState(1);
  const { language } = i18n;

  const { data, isLoading, isError } = usePokemons(page, language);
  const [search, setSearch] = useState("");
  const [searchBySort, setSearchBySort] = useState<"name" | "number">("number");

  const filteredData = data
    ?.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (searchBySort === "name") {
        return a.name.localeCompare(b.name);
      }

      return a.id - b.id;
    });

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ backgroundColor: colors.primary }}
      className="flex-1 p-2"
    >
      <View className="px-2">
        <Header />
        <SearchBar
          search={search}
          onSearchChange={setSearch}
          onSort={setSearchBySort}
        />
      </View>

      <View
        style={{ backgroundColor: colors.background }}
        className="flex-1 rounded-3xl overflow-hidden p-2 mt-6"
      >
        {isError && (
          <View className="flex-1 items-center justify-center">
            <Text style={{ color: colors.foreground }}>
              {t("common.error")}
            </Text>
          </View>
        )}
        <Pagination
          page={page}
          onPrevious={() => setPage((prev) => prev - 1)}
          onNext={() => setPage((prev) => prev + 1)}
        />
        {isLoading && (
          <FlatList
            className="mt-5"
            data={Array.from({ length: 15 })}
            numColumns={3}
            keyExtractor={(_, index) => index.toString()}
            columnWrapperStyle={{
              marginBottom: 12,
            }}
            renderItem={() => (
              <View className="w-1/3 items-center">
                <CardPokemonSkeleton />
              </View>
            )}
          />
        )}

        {data && !isLoading && !isError && (
          <FlatList
            className="mt-5"
            data={filteredData}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()}
            columnWrapperStyle={{
              marginBottom: 12,
            }}
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
        )}
      </View>
    </SafeAreaView>
  );
}
