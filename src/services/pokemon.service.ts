import { mapPokemon } from "@/mappers/pokemon.mapper";
import { PokemonListItem } from "@/type";

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
