import React from 'react'
import PokemonList from '../components/PokemonList'
import { Container } from 'react-bootstrap'
import Filter from '../components/Filter'

const Home = () => {
  return (
    <main className="mainPage my-4">
      <Container>
        <h1 className='text-center text-light fw-bold my-4 robotoFont'>Pokedex - Crew Paleta</h1>
        <Filter />
        <PokemonList/>
        
      </Container>
    </main>
  )
}

export default Home