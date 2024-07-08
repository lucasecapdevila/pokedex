import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNextPokemons, getPokemons } from "./slices/pokemonSlice.js";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const datosPokemon = useSelector((state) => state.pokemon.datosPokemon)
  const status = useSelector((state) => state.pokemon.status)
  const error = useSelector((state) => state.pokemon.error)
  const nextPokemons = useSelector((state) => state.pokemon.nextPokemons)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPokemons())
  }
  , [])  

  // useEffect(() => {
  //   dispatch(getPokemons())
  // }, [datosPokemon])

  const handleNewPokemon = () => {
    dispatch(getNextPokemons())
    console.log(nextPokemons);
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
      {content}
      <Button onClick={handleNewPokemon}>Ver más</Button>

    </Container>
  );
}

export default App;
