import React, { useEffect, useState } from 'react'
import { ViewDetail } from '../models'
import './style.css'

export interface PokemonItemProps {
  abilities:
    | {
        name: string
        ability: string
      }[]
    | undefined
  name: string
  id: number
  image: string
  viewDetail: ViewDetail
  setViewDetail: React.Dispatch<React.SetStateAction<ViewDetail>>
}

export function PokemonItem(props: PokemonItemProps) {
  const { name, id, image, abilities, viewDetail, setViewDetail } = props
  const [selected, setSelected] = useState<boolean>(false)
  useEffect(() => {
    setSelected(id === viewDetail.id)
  }, [viewDetail])

  const handleClose = () => {
    setViewDetail({
      id: 0,
      isOpened: false,
    })
  }

  return (
    <div>
      {selected ? (
        <section className='pokemon-item-detailed'>
          <div className='detail-container'>
            <p className='detail-close' onClick={handleClose}>
              X
            </p>
            <div className='detail-info'>
              <img src={image} alt={name} className='detail-img' />
              <p className='detail-name'>{name}</p>
            </div>
            <div className='detail-skill'>
              <p className='detail-ability'>Abilities: </p>
              {abilities?.map((item: any) => {
                return <div className=''>{item.ability.name}</div>
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className='pokemon-item-container'>
          <p className='pokemon-name'>{name}</p>
          <img src={image} alt={name} />
        </section>
      )}
    </div>
  )
}
