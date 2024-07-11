import { useDispatch, useSelector } from "react-redux";
import { getNextPokemons, getPokemons } from "../slices/pokemonSlice";
import { Button, Col, Row } from "react-bootstrap";
import CardPokemon from "./CardPokemon";
import { useEffect } from "react";
import Filter from "./Filter";
import Loader from "../common/Loader";

const PokemonList = () => {
  const datosPokemon = useSelector((state) => state.pokemon.datosPokemon);
  const status = useSelector((state) => state.pokemon.status);
  const error = useSelector((state) => state.pokemon.error);
  const nextPokemons = useSelector((state) => state.pokemon.nextPokemons);
  const loading = useSelector((state) => state.spinner);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  const handleNewPokemon = () => {
    /* Esta es la funcionalidad que realiza el fetcheo a los siguientes pokemons*/

    dispatch(getNextPokemons(nextPokemons));
    /* Dejo la explicación de como funciona esto en el slice */
  };

  let content;

  if (status === "Cargando") {
    content = <h2 className="text-center"><Loader/></h2>;
  } else if (status === "Exitoso") {
    content = (
      <>
      {loading ? <Loader/> : 
      <>
      <h2 className="text-center">Pokemons</h2>
        <Row sm={1} md={3} lg={4} xl={5}>
          {datosPokemon.map((pokemon) => (
            <Col key={pokemon.id} className="mb-2">
              <CardPokemon pokemon={pokemon}></CardPokemon>
            </Col>
          ))}
        </Row>
        <Button onClick={handleNewPokemon}>Ver más</Button>
        </>
      }
      </>
    );
  } else if (status === "Rechazado") {
    content = <p>Error al cargar los pokemon: {error}</p>;
  }

  return (
    <>
      {/* <Filter /> */}
      {/* <br /> */}
      {content}
      
    </>
  );
};

export default PokemonList;
