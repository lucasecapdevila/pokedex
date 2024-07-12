import { useDispatch, useSelector } from "react-redux";
import { getNextPokemons, getPokemons, getTypes } from "../slices/pokemonSlice";
import { Button, Col, Row } from "react-bootstrap";
import CardPokemon from "./CardPokemon";
import { useEffect } from "react";
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
    dispatch(getTypes());
  }, []);

  // useEffect(() => {
  //   if (loading === "Cargando") 
  //   {
  //     console.log("Cargando")
  //   }

  // }, [datosPokemon]);

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
        <Row sm={1} md={2} lg={3} xl={4}>
          {datosPokemon.map((pokemon) => (
            <Col key={pokemon.id} className="mb-2">
              <CardPokemon pokemon={pokemon}></CardPokemon>
            </Col>
          ))}
        </Row>
        <Button className="mx-auto my-2 fw-light robotoFont" onClick={handleNewPokemon}>Cargar más Pokemon</Button>
        </>
      }
      </>
    );
  } else if (status === "Rechazado") {
    content = <p>Error al cargar los pokemon: {error}</p>;
  }

  return (
    <>
      <div className="d-flex flex-column">
        {content}
      </div>
    </>
  );
};

export default PokemonList;
