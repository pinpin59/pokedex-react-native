export interface Pokemon {
  id: number;
  name: string;
  image: string | null;
  types: string[];
  cry: string | null;
  description: string | null;
  details: PokemonDetails;
  moves: PokemonMove[];
}

export interface PokemonDetails {
  height: number;
  weight: number;
  stats: PokemonStats;
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonListItem {
  id: number;
  name: string;
  image: string;
}

export interface PokemonMove {
  name: string;
  url: string;
}

export type PokemonSpecies = {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
};
