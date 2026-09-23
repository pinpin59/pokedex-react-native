export interface Pokemon {
  id: number;
  name: string;
  image: string | null;
  types: string[];
  cry: string | null;
  details: PokemonDetails;
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
