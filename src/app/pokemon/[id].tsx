import { AboutList } from "@/components/pokedex/AboutList";
import { CardType } from "@/components/pokedex/CardType";
import { StatsList } from "@/components/pokedex/StatsList";
import { Spinner } from "@/components/ui/Spinner";
import SVG from "@/components/ui/svgComponent";
import { usePokemon } from "@/hooks/usePokemon";
import { usePokemonSpecies } from "@/hooks/usePokemonSpecies";
import i18n from "@/i18n";
import { SVGArrowBack, SVGPokeball } from "@/svg";
import { pokemonColors, PokemonType } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PokemonDetail() {
  const router = useRouter();
  const { t, language } = i18n;
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError } = usePokemon(Number(id));
  const { data: speciesData } = usePokemonSpecies(Number(id), language);

  const { colors } = useTheme();
  const backgroundColor = data?.types[0]
    ? pokemonColors[data.types[0] as PokemonType]
    : colors.primary;
  const [pokemonBottom, setPokemonBottom] = useState(0);
  const [bottomCardTop, setBottomCardTop] = useState(0);
  const cardTypeTop = Math.max(pokemonBottom - bottomCardTop, 0);
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ backgroundColor }}
      className="flex-1 p-2"
    >
      {/* Image */}
      {data?.image && (
        <View
          className="absolute left-0 right-0 z-10 items-center"
          style={{ top: "18%" }}
          onLayout={(event) => {
            const { y, height } = event.nativeEvent.layout;

            setPokemonBottom(y + height);
          }}
        >
          <Image
            source={{ uri: data.image }}
            className="h-64 w-64"
            resizeMode="contain"
          />
        </View>
      )}

      {/*Top card */}
      <View className="relative flex-row items-center justify-between px-5">
        <SVG
          icon={SVGPokeball}
          width={230}
          height={230}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            opacity: 0.4,
          }}
        />
        <View className="flex flex-row gap-3 items-center">
          <Pressable onPress={() => router.back()}>
            <SVG icon={SVGArrowBack} width={30} height={30} />
          </Pressable>
          <Text className="text-center capitalize text-headline text-white">
            {data?.name}
          </Text>
        </View>
        <Text className="text-center text-subtitle-1 text-white">
          #{data?.id}
        </Text>
      </View>

      {/* Bottom card */}
      <View
        style={{ backgroundColor: colors.background }}
        className="mt-auto h-[70%] w-full rounded-3xl p-2"
        onLayout={(event) => {
          setBottomCardTop(event.nativeEvent.layout.y);
        }}
      >
        {isLoading && <Spinner />}

        {isError && <Text>{t("cardPokemon.error")}</Text>}

        {data && (
          <View
            style={{
              paddingTop: cardTypeTop,
            }}
            className="items-center"
          >
            <CardType types={data.types} />
            <Text
              style={{ color: backgroundColor }}
              className="text-center text-subtitle-1 mt-5"
            >
              {t("cardPokemon.about")}
            </Text>

            <View className="mt-5">
              <AboutList data={data} />
            </View>

            <Text
              style={{ color: colors.foreground }}
              className="text-center text-body-1 mt-10 px-2"
            >
              {speciesData?.description}
            </Text>

            <View className="mt-5">
              <StatsList data={data.details.stats} color={backgroundColor} />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
