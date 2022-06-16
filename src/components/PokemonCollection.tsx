import * as React from 'react'
import {
    PokemonDetailIncludeAbilities,
    ViewDetail
} from '../models'
import { PokemonItem } from './PokemonItem'
import './style.css'

export interface PokemonCollectionProps {
  pokemonList: PokemonDetailIncludeAbilities[]
  viewDetail: ViewDetail
  setViewDetail: React.Dispatch<React.SetStateAction<ViewDetail>>
}

export function PokemonCollection({
  pokemonList,
  viewDetail,
  setViewDetail,
}: PokemonCollectionProps) {
  const handleClickPokemon = (id: number) => {
    if (!viewDetail.isOpened) {
      setViewDetail({
        id: id,
        isOpened: true,
      })
    }
  }

  return (
    <>
      <section
        className={
          viewDetail.isOpened
            ? 'collection-container-active'
            : 'collection-container'
        }
      >
        {viewDetail.isOpened ? (
          <div className='overlay'></div>
        ) : (
          <div className=''></div>
        )}

        {pokemonList.map((pokemon) => {
          return (
            <div className='' onClick={() => handleClickPokemon(pokemon.id)}>
              <PokemonItem
                key={pokemon.id}
                name={pokemon.name}
                viewDetail={viewDetail}
                setViewDetail={setViewDetail}
                abilities={pokemon.abilities}
                id={pokemon.id}
                image={pokemon.sprites.front_default}
              />
            </div>
          )
        })}
      </section>
    </>
  )
}
