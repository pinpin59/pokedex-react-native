import type { Pokemon } from "@/type";

export const mapPokemon = (data: any): Pokemon => {
  return {
    id: data.id,
    name: data.name,

    image: data.sprites.other["official-artwork"].front_default,

    types: data.types.map((type: { type: { name: string } }) => type.type.name),

    cry: data.cries.latest,

    details: {
      height: data.height,
      weight: data.weight,

      stats: {
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        specialAttack: data.stats[3].base_stat,
        specialDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
      },
    },
  };
};
