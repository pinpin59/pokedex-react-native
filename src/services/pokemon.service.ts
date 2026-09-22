import { mapPokemon } from "@/mappers/pokemon.mapper";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getPokemonList = async (limit = 20, offset = 0) => {
  const response = await fetch(
    `${API_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }

  const data = await response.json();
  return mapPokemon(data);
};

export const getPokemon = async (id: number) => {
  const response = await fetch(`${API_URL}/pokemon/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon");
  }

  const data = await response.json();
  return mapPokemon(data);
};
