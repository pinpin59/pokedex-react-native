export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  cry: string;
  description: string;
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
  names: {
    name: string;
    language: {
      name: string;
    };
  }[];

  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
};
