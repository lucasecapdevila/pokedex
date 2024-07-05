import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "./slices/pokemonSlice.js";
import { Container } from "react-bootstrap";
import CardPokemon from "./components/CardPokemon.jsx";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const datosPokemon = useSelector((state) => state.pokemon.datosPokemon)
  const status = useSelector((state) => state.pokemon.status)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPokemons())
  }
  , [])

  let id = new Date().getTime()

  const handleNewPokemon = () => {
    pass
  }

  return (
    <Container className="flex justify-center">
      <h1>Pokemon</h1>
      {
        status == 'Exitoso' ? (
          <>
            <Container >
            {
              datosPokemon.map((pokemon, index) => {
                <>
                  <CardPokemon key={index} name={pokemon.name} img={pokemon.url}></CardPokemon>
                </>
              })
            }
          </Container> 
          <Button variant="primary" onClick={handleNewPokemon}>Primary</Button>{'More'}
          </>
        ) : 
        (
          <p>Cargando...</p>
        )
      }
    

    </Container>
  );
}

export default App;
