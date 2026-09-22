import { getPokemon } from "@/services/pokemon.service";
import { useQuery } from "@tanstack/react-query";

export const usePokemon = (id: number) => {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemon(id),
  });
};
