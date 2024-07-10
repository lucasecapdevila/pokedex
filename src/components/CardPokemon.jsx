import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { primerLetraMayuscula } from "../helpers/funciones";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPokemon } from "../slices/pokemonSlice";
import { useTranslation } from "react-i18next";


function CardPokemon({ pokemon }) {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tipoPokemon = (type) => {
    console.log(type);
  };

  const handleDescriptionPokemon = (pokemon, name) => {
    dispatch(setPokemon(pokemon));
    navigate(`/detalle/${name}`);
  }

  return (
    <Card className="h-100 hoverCard">
      <Card.Header className="fw-bold text-center">
        N°{pokemon.id}: {primerLetraMayuscula(pokemon.name)}
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <Card.Img
          variant="top"
          className="h-100"
          src={pokemon.sprites.other.dream_world.front_default}
        />
        <Card.Text className="flex-grow-1">
          <br />
          Tipo:{" "}
          {pokemon.types
            .map((tipo) => t(tipo.type.name))
            .join(" ")}
            <br/>
        </Card.Text>
        <Container className="d-flex flex-column gap-1">
          <Button className="btn btn-success mt-auto" onClick={() => {handleDescriptionPokemon(pokemon, primerLetraMayuscula(pokemon.name))}}>
            Más info
          </Button>
        </Container>
      </Card.Body>
    </Card>
  );
}

export default CardPokemon;
