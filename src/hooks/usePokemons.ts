import { getPokemonList } from "@/services/pokemon.service";
import { useQuery } from "@tanstack/react-query";

export const usePokemons = (limit = 20, offset = 0) => {
  return useQuery({
    queryKey: ["pokemons", limit, offset],
    queryFn: () => getPokemonList(limit, offset),
  });
};
