import { mapPokemon } from "@/mappers/pokemon.mapper";
import type { PokemonListItem, PokemonSpecies } from "@/type";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getPokemonList = async (
  limit = 20,
  offset = 0,
): Promise<PokemonListItem[]> => {
  const response = await fetch(
    `${API_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }

  const data = await response.json();

  return data.results.map((pokemon: { name: string; url: string }) => {
    const id = Number(pokemon.url.split("/").at(-2));

    return {
      id,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    };
  });
};

export const getPokemon = async (id: number) => {
  const response = await fetch(`${API_URL}/pokemon/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon");
  }

  const data = await response.json();
  return mapPokemon(data);
};

export const getPokemonSpecies = async (
  id: number,
  language: string,
): Promise<{ name: string; description: string }> => {
  const response = await fetch(`${API_URL}/pokemon-species/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon species");
  }

  const data: PokemonSpecies = await response.json();

  const nameEntry = data.names.find(
    (entry) => entry.language.name === language,
  );

  const descriptionEntry = data.flavor_text_entries.find(
    (entry) => entry.language.name === language,
  );

  return {
    name: nameEntry?.name ?? "",
    description:
      descriptionEntry?.flavor_text.replace(/\n|\f/g, " ").trim() ?? "",
  };
};

export const getPokemonsTranslatedNames = async (
  pokemonList: PokemonListItem[],
  language: string,
): Promise<PokemonListItem[]> => {
  return Promise.all(
    pokemonList.map(async (pokemon) => {
      const response = await fetch(`${API_URL}/pokemon-species/${pokemon.id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon species");
      }

      const data = await response.json();

      const translatedName = data.names.find(
        (item: any) => item.language.name === language,
      );

      return {
        ...pokemon,
        name: translatedName?.name ?? pokemon.name,
      };
    }),
  );
};
