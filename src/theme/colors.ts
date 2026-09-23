export const colors = {
  pokemon: {
    bug: "#A7B723",
    dark: "#75574C",
    dragon: "#7037FF",
    electric: "#F9CF30",
    fighting: "#C12239",
    fire: "#F57D31",
    flying: "#A891EC",
    ghost: "#70559B",
    normal: "#AAA67F",
    grass: "#74CB48",
    ground: "#DEC16B",
    ice: "#9AD6DF",
    poison: "#A43E9E",
    psychic: "#FB5584",
    rock: "#B69E31",
    steel: "#B7B9D0",
    water: "#6493EB",
  },

  light: {
    background: "#EFEFEF",
    foreground: "#212121",
    primary: "#DC0A2D",
    grayscale: {
      dark: "#212121",
      medium: "#666666",
      light: "#E0E0E0",
      background: "#EFEFEF",
      white: "#FFFFFF",
    },
  },

  dark: {
    background: "#212121",
    foreground: "#FFFFFF",
    primary: "#A80724",

    grayscale: {
      dark: "#FFFFFF",
      medium: "#B3B3B3",
      light: "#444444",
      background: "#121212",
      white: "#212121",
    },
  },
} as const;
export type ThemeName = "light" | "dark";
export type ThemeColors = (typeof colors)[ThemeName];

export const pokemonColors = colors.pokemon;
export type PokemonType = keyof typeof pokemonColors;
