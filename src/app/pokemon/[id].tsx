import { AboutList } from "@/components/pokedex/AboutList";
import { CardType } from "@/components/pokedex/CardType";
import { PokemonCry } from "@/components/pokedex/PokemonCry";
import { StatsList } from "@/components/pokedex/StatsList";
import { Spinner } from "@/components/ui/Spinner";
import SVG from "@/components/ui/svgComponent";
import { usePokemon } from "@/hooks/usePokemon";
import { usePokemonSpecies } from "@/hooks/usePokemonSpecies";
import i18n from "@/i18n";
import {
  SVGArrowBack,
  SVGArrowSelectBack,
  SVGArrowSelectNext,
  SVGPokeball,
} from "@/svg";
import { pokemonColors, PokemonType } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideInRight,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PokemonDetail() {
  const router = useRouter();
  const { t, language } = i18n;
  const { id } = useLocalSearchParams<{ id: string }>();

  const [pokemonId, setPokemonId] = useState(Number(id));
  const [direction, setDirection] = useState<"next" | "previous">("next");

  const { data, isLoading, isError } = usePokemon(pokemonId);
  const { data: speciesData } = usePokemonSpecies(pokemonId, language);

  const { colors } = useTheme();

  const backgroundColor = data?.types[0]
    ? pokemonColors[data.types[0] as PokemonType]
    : colors.background;

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleNext = () => {
    if (pokemonId < 1351) {
      setDirection("next");
      setPokemonId((current) => current + 1);
    }
  };

  const handlePrevious = () => {
    if (pokemonId > 1) {
      setDirection("previous");
      setPokemonId((current) => current - 1);
    }
  };

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{
        backgroundColor,
        flex: 1,
        overflow: "hidden",
      }}
    >
      {/* Background Pokeball */}
      <SVG
        icon={SVGPokeball}
        width={230}
        height={230}
        style={{
          position: "absolute",
          right: -20,
          top: 0,
          opacity: 0.2,
          zIndex: 0,
        }}
      />

      {/* top section */}
      <View
        style={{ flex: 1, paddingHorizontal: 20, paddingTop: 16, zIndex: 1 }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Pressable
              onPress={handleBack}
              accessibilityRole="button"
              accessibilityLabel={t("accessibility.back")}
              accessibilityHint={t("accessibility.backHint")}
              hitSlop={15}
            >
              <SVG icon={SVGArrowBack} width={30} height={30} color="#FFF" />
            </Pressable>

            <Animated.View
              key={`name-${pokemonId}`}
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(100)}
            >
              <Text
                className="capitalize text-headline text-white font-bold text-2xl"
                accessibilityRole="header"
              >
                {speciesData?.name ?? data?.name}
              </Text>
            </Animated.View>
          </View>

          <Animated.View
            key={`number-${pokemonId}`}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(100)}
          >
            <Text
              className="text-subtitle-1 text-white font-bold text-lg"
              accessible
              accessibilityLabel={
                data?.id
                  ? t("accessibility.pokemonNumber", { id: data.id })
                  : t("accessibility.pokemonNumberFallback")
              }
            >
              #{data?.id?.toString().padStart(3, "0")}
            </Text>
          </Animated.View>
        </View>

        <View className="mt-4 items-start">
          {data?.cry && <PokemonCry cry={data.cry} />}
        </View>

        {/* navigation arrows */}
        <View className="mt-auto mb-2 flex-row justify-between w-full">
          <Pressable
            disabled={pokemonId === 1}
            onPress={handlePrevious}
            accessibilityRole="button"
            hitSlop={20}
            style={{ opacity: pokemonId === 1 ? 0.5 : 1 }}
          >
            <SVG
              icon={SVGArrowSelectBack}
              width={25}
              height={25}
              color="#FFF"
            />
          </Pressable>

          <Pressable
            disabled={pokemonId === 1351}
            onPress={handleNext}
            accessibilityRole="button"
            hitSlop={20}
            style={{ opacity: pokemonId === 1351 ? 0.5 : 1 }}
          >
            <SVG
              icon={SVGArrowSelectNext}
              width={25}
              height={25}
              color="#FFF"
            />
          </Pressable>
        </View>
      </View>

      {/* bottom card */}
      <View
        style={{
          backgroundColor: colors.background,
          height: "70%",
          width: "100%",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          zIndex: 10,
          elevation: 10,
        }}
      >
        {/* IMAGE POKEMON */}
        {data?.image && (
          <Animated.View
            key={`image-${pokemonId}`}
            pointerEvents="none"
            entering={
              direction === "next"
                ? SlideInRight.duration(300)
                : SlideInLeft.duration(300)
            }
            style={{
              position: "absolute",
              top: -160,
              left: 0,
              right: 0,
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
              elevation: 100,
            }}
          >
            <Image
              source={{ uri: data.image }}
              style={{
                width: 220,
                height: 220,
              }}
              resizeMode="contain"
            />
          </Animated.View>
        )}

        {/* content of the card */}
        {isLoading && (
          <View className="pt-20 items-center">
            <Spinner />
          </View>
        )}

        {isError && (
          <View className="pt-20 items-center">
            <Text style={{ color: colors.foreground }}>
              {t("cardPokemon.error")}
            </Text>
          </View>
        )}

        {data && !isLoading && !isError && (
          <Animated.View
            key={`content-${pokemonId}`}
            entering={FadeIn.duration(250).delay(50)}
            exiting={FadeOut.duration(150)}
            style={{
              flex: 1,
              paddingTop: 70,
              paddingBottom: 20,
              paddingHorizontal: 20,
              alignItems: "center",
              justifyContent: "space-evenly",
              zIndex: 1,
            }}
          >
            <CardType types={data.types} />

            <Text
              style={{ color: backgroundColor }}
              className="text-center text-subtitle-1 font-bold text-lg"
            >
              {t("cardPokemon.about")}
            </Text>

            <View className="w-full flex-row justify-center">
              <AboutList data={data} />
            </View>

            <Text
              style={{ color: colors.foreground }}
              className="px-2 text-center text-body-1 leading-5"
              numberOfLines={3}
              adjustsFontSizeToFit
            >
              {speciesData?.description}
            </Text>

            <View className="w-full">
              <StatsList data={data.details.stats} color={backgroundColor} />
            </View>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}
