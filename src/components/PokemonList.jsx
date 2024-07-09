import { useDispatch, useSelector } from "react-redux"
import { getNextPokemons, getPokemons } from "../slices/pokemonSlice"
import { Button, Col, Row } from "react-bootstrap"
import CardPokemon from "./CardPokemon"
import { useEffect } from "react"

const PokemonList = () => {
  const datosPokemon = useSelector((state) => state.pokemon.datosPokemon)
  const status = useSelector((state) => state.pokemon.status)
  const error = useSelector((state) => state.pokemon.error)
  const nextPokemons = useSelector((state) => state.pokemon.nextPokemons)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPokemons())
  }
  , [])

  const handleNewPokemon = () => {
    /* Esta es la funcionalidad que realiza el fetcheo a los siguientes pokemons*/
    
    dispatch(getNextPokemons(nextPokemons))
    /* Dejo la explicación de como funciona esto en el slice */
  }

  let content

  if(status === 'Cargando'){
    content = <h2 className="text-center">Cargando...</h2>
  } else if(status === 'Exitoso'){
    content = (
      <Row sm={1} md={3} lg={4} xl={6}>
        {datosPokemon.map((pokemon) => (
          <Col key={pokemon.id}>
            <CardPokemon pokemon={pokemon}></CardPokemon>
          </Col>
        ))}
      </Row>
    )
  } else if(status === 'Rechazado'){
    content = <p>Error al cargar los pokemon: {error}</p>
  }

  return (
    <>
      {content}
      <Button onClick={handleNewPokemon}>Ver más</Button>
    </>
  )
}

export default PokemonList