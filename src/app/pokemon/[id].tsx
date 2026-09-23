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

  const [pokemonBottom, setPokemonBottom] = useState(0);
  const [bottomCardTop, setBottomCardTop] = useState(0);

  const cardTypeTop = Math.max(pokemonBottom - bottomCardTop, 0);

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
      style={{ backgroundColor }}
      className="flex-1 p-2"
    >
      {/* Image Pokémon */}
      {data?.image && (
        <Animated.View
          key={`image-${pokemonId}`}
          pointerEvents="none"
          entering={
            direction === "next"
              ? SlideInRight.duration(300)
              : SlideInLeft.duration(300)
          }
          className="absolute left-0 right-0 z-10 items-center"
          style={{ top: "18%" }}
          onLayout={(event) => {
            const { y, height } = event.nativeEvent.layout;
            setPokemonBottom(y + height);
          }}
          accessible
          accessibilityRole="image"
          accessibilityLabel={
            data.name
              ? t("accessibility.pokemonImage", {
                  name: speciesData?.name ?? data?.name,
                  id: data.id,
                })
              : t("accessibility.pokemonImageFallback")
          }
        >
          <Image
            source={{ uri: data.image }}
            className="h-64 w-64"
            resizeMode="contain"
            accessible={false}
          />
        </Animated.View>
      )}

      {/* Top card */}
      <View className="relative flex-row items-center justify-between px-5">
        {/* Décoratif */}
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

        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel={t("accessibility.back")}
            accessibilityHint={t("accessibility.backHint")}
          >
            <SVG icon={SVGArrowBack} width={30} height={30} color="#FFF" />
          </Pressable>

          <Animated.View
            key={`name-${pokemonId}`}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(100)}
          >
            <Text
              className="text-center capitalize text-headline text-white"
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
            className="text-center text-subtitle-1 text-white"
            accessible
            accessibilityLabel={
              data?.id
                ? t("accessibility.pokemonNumber", { id: data.id })
                : t("accessibility.pokemonNumberFallback")
            }
          >
            #{data?.id}
          </Text>
        </Animated.View>
      </View>

      {/* Zone entre le header et la bottom card */}
      <View className="mt-5 flex-1 px-5">
        {data?.cry && <PokemonCry cry={data.cry} />}

        <View className="mt-auto mb-5 flex-row justify-between">
          <Pressable
            disabled={pokemonId === 1}
            onPress={handlePrevious}
            accessibilityRole="button"
            accessibilityLabel={t("accessibility.previousPokemon")}
            accessibilityHint={t("accessibility.previousPokemonHint")}
            accessibilityState={{
              disabled: pokemonId === 1,
            }}
            hitSlop={10}
          >
            <SVG
              icon={SVGArrowSelectBack}
              width={23}
              height={23}
              color="#FFF"
            />
          </Pressable>

          <Pressable
            disabled={pokemonId === 1351}
            onPress={handleNext}
            accessibilityRole="button"
            accessibilityLabel={t("accessibility.nextPokemon")}
            accessibilityHint={t("accessibility.nextPokemonHint")}
            accessibilityState={{
              disabled: pokemonId === 1351,
            }}
            hitSlop={10}
          >
            <SVG
              icon={SVGArrowSelectNext}
              width={23}
              height={23}
              color="#FFF"
            />
          </Pressable>
        </View>
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

        {isError && (
          <Text
            accessible
            accessibilityRole="alert"
            style={{ color: colors.foreground }}
          >
            {t("cardPokemon.error")}
          </Text>
        )}

        {data && (
          <Animated.View
            key={`content-${pokemonId}`}
            entering={FadeIn.duration(250)}
            exiting={FadeOut.duration(150)}
            style={{
              paddingTop: cardTypeTop,
            }}
            className="items-center"
          >
            <CardType types={data.types} />

            <Text
              style={{ color: backgroundColor }}
              className="mt-5 text-center text-subtitle-1"
              accessibilityRole="header"
            >
              {t("cardPokemon.about")}
            </Text>

            <View className="mt-5">
              <AboutList data={data} />
            </View>

            <Text
              style={{ color: colors.foreground }}
              className="mt-10 px-2 text-center text-body-1"
            >
              {speciesData?.description}
            </Text>

            <View className="mt-5">
              <StatsList data={data.details.stats} color={backgroundColor} />
            </View>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}
