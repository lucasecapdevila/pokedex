import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNextPokemons, getPokemon, getPokemons, searchPokemon } from "./slices/pokemonSlice.js";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const datosPokemon = useSelector((state) => state.pokemon.datosPokemon)
  const status = useSelector((state) => state.pokemon.status)
  const error = useSelector((state) => state.pokemon.error)
  const nextPokemons = useSelector((state) => state.pokemon.nextPokemons)

  const dispatch = useDispatch()
  const [searchPoke, setSearchPoke] = useState('')

  useEffect(() => {
    dispatch(getPokemons())
  }
  , [])  

  const handleNewPokemon = () => {
    /* Esta es la funcionalidad que realiza el fetcheo a los siguientes pokemons*/
    
    dispatch(getNextPokemons(nextPokemons))
    /* Dejo la explicación de como funciona esto en el slice */
  }

  const handlePokemon = (id) => {
    /* 
      Esta es la funcionalidad que se va a hacer con el botón de + info, que es para ver la info específica de un pokemon
      Ya está funcionando esto con el reducer; solo falta hacer la card específica, eso lo hacen con lo del
      react-router-dom y todo eso... 
    */
    dispatch(getPokemon(id))
  }

  const handleSearchPokemon = (e) => {
    e.preventDefault()
    /* 
      Esta es la funcionalidad que se va a hacer con el botón de buscar, que es para buscar un pokemon específico
      Ya está funcionando esto con el reducer; solo falta hacer la página específica,  se puede reutilizar la de arriba eso lo hacen con lo del
      react-router-dom y todo eso... 
    */
    dispatch(searchPokemon(searchPoke))
  }

  let content

  if(status === 'Cargando'){
    content = <p>Cargando...</p>
  } else if(status === 'Exitoso'){
    content = (
      <Row sm={1} md={4} lg={6}>
        {datosPokemon.map((pokemon) => (
          <Col key={pokemon.id}>
            <Card className="h-100">
              <Card.Header as="h5">{pokemon.name}</Card.Header>
              <Card.Body>
                <Card.Img variant="top" src={pokemon.sprites.other.dream_world.front_default} />
                <Card.Text>
                  {pokemon.description}
                </Card.Text>
                <Button onClick={() => handlePokemon(pokemon.id)}>+ info</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    )
  } else if(status === 'Rechazado'){
    content = <p>Error al cargar los pokemon: {error}</p>
  }

  return (
    <Container className="flex justify-center">
      <h1>Pokemon</h1>
      <form onSubmit={(e) => handleSearchPokemon(e)}>
        <input type="text" placeholder="Buscar pokemon" value={searchPoke} onChange={(e) => { setSearchPoke(e.target.value)}}/>
        <Button type="submit">Buscar</Button>
      </form>


      {content}


      <Button onClick={handleNewPokemon}>Ver más</Button>

    </Container>
  );
}

export default App;
