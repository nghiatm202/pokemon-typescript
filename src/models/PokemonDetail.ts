export interface PokemonDetail {
  id: number
  name: string
  sprites: {
    front_default: string
  }
}

export interface PokemonDetailIncludeAbilities extends PokemonDetail {
  abilities?: {
    ability: string
    name: string
  }[]
}
