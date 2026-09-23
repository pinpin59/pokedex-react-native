import {
  getPokemonList,
  getPokemonsTranslatedNames,
} from "@/services/pokemon.service";
import { useQuery } from "@tanstack/react-query";

export const usePokemons = (page: number, language: string) => {
  return useQuery({
    queryKey: ["pokemons", page, language],

    queryFn: async () => {
      const pokemonList = await getPokemonList(21, (page - 1) * 20);

      return getPokemonsTranslatedNames(pokemonList, language);
    },
  });
};
