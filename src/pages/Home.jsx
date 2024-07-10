import React from 'react'
import PokemonList from '../components/PokemonList'
import { Container } from 'react-bootstrap'

const Home = () => {
  return (
    <Container>
      <h1 className='text-center my-4'>Pokedex - Crew Paleta</h1>
      <PokemonList/>
      
    </Container>
  )
}

export default Home