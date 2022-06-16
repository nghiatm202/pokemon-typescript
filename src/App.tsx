import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { PokemonCollection } from './components'
import { PokemonDetail, ViewDetail } from './models'

interface Pokemon {
  name: string
  url: string
}

const App: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([])
  const [nextUrl, setNextUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [viewDetail, setViewDetail] = useState<ViewDetail>({
    id: 0,
    isOpened: false,
  })

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20'
      )

      setNextUrl(res.data.next)

      res.data.results.forEach(async (pokemon: Pokemon) => {
        const pokemonInfo = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        )

        setPokemonList((pokemonPrev) => [...pokemonPrev, pokemonInfo.data])
        setLoading(false)
      })
    }
    getPokemon()
  }, [])

  const handleLoadMore = async () => {
    setLoading(true)
    let res = await axios.get(nextUrl)
    setNextUrl(res.data.next)

    res.data.results.forEach(async (pokemon: Pokemon) => {
      const pokemonInfo = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      )

      setPokemonList((pokemonPrev) => [...pokemonPrev, pokemonInfo.data])
      setLoading(false)
    })
  }

  return (
    <div className='App'>
      <div className='container'>
        <div className='pokemon-header'>Pokemon</div>
        <PokemonCollection
          pokemonList={pokemonList}
          viewDetail={viewDetail}
          setViewDetail={setViewDetail}
        />
        {!viewDetail.isOpened && (
          <div className='btn'>
            <button onClick={handleLoadMore}>
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
