import { getPokemonSpecies } from "@/services/pokemon.service";
import { useQuery } from "@tanstack/react-query";

export const usePokemonSpecies = (id: number, language: string) => {
  return useQuery({
    queryKey: ["pokemon-species", id, language],
    queryFn: () => getPokemonSpecies(id, language),
    enabled: !!id,
  });
};
