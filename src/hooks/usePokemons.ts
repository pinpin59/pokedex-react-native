import { getPokemonList } from "@/services/pokemon.service";
import { useQuery } from "@tanstack/react-query";

export const usePokemons = (page: number) => {
  const limit = 21;
  const offset = (page - 1) * limit;

  return useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => getPokemonList(limit, offset),
  });
};
