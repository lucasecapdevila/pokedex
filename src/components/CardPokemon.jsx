import React from 'react'
import Card from 'react-bootstrap/Card';
import { primerLetraMayuscula } from '../helpers/funciones';
import { Link } from 'react-router-dom';
function CardPokemon({ pokemon }) {
  const tipoPokemon = (id) => {

  }

  return (
    <Card className="h-100">
      <Card.Header className='fw-bold text-center'>N°{pokemon.order}: {primerLetraMayuscula(pokemon.name)}</Card.Header>
      <Card.Body className='d-flex flex-column'>
        <Card.Img variant="top" className='h-100' src={pokemon.sprites.other.dream_world.front_default} />
        <Card.Text className='flex-grow-1'>
          <br />
          Tipo: {pokemon.types.map(tipo => primerLetraMayuscula(tipo.type.name)).join(' ')}
        </Card.Text>
        <Link className='btn btn-success mt-auto' to={`/detalle/${pokemon.name}`}>Más info</Link>
      </Card.Body>
    </Card>
  )
}

export default CardPokemon