import { useParams } from "react-router-dom"
import { getPokemon, getPokemons } from "../slices/pokemonSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Container } from "react-bootstrap"

const PokemonPage = () => {
  //!  Nombre del pokemon que uso como parametro
  const {name} = useParams()

  //! Lo traigo del Slice
  const infoPokemon = useSelector((state) => state.pokemon.specificPokemon)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPokemon(name))
  }, [])

  return (
    <Container>
      {/* Aquí puedo comprobar que está funcionando bien el llamado */}
      <h1>{infoPokemon.name}</h1>
    </Container>
  )
}

export default PokemonPage