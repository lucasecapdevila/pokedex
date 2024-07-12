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
      <Card.Header className="text-center fs-4 fw-light ubuntuFont">
        N°{pokemon.id}: {primerLetraMayuscula(pokemon.name)}
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <Card.Img
          variant="top"
          className="h-100 bg-dark-subtle"
          src={pokemon.sprites.other.dream_world.front_default}
        />
        <Card.Text className="d-flex flex-column flex-md-row gap-2 mt-2 mx-auto flex-grow-1">
          {/* <br /> */}
          {/* <div className="d-flex flex-column gap-2 mt-2"> */}
            {pokemon.types
              .map((tipo) => (
                <span key={tipo.type.name} className={`PixelifyFont fw-bold tipoPokemon ${tipo.type.name}`}>
                  {
                    t(tipo.type.name)
                  }
                </span>
              ))
            }
          {/* </div> */}
          {/* <br/> */}
        </Card.Text>
        <Container className="d-flex flex-column gap-1">
          <Button className="btn btn-success mt-auto fw-light robotoFont" onClick={() => {handleDescriptionPokemon(pokemon, primerLetraMayuscula(pokemon.name))}}>
            Ver info
          </Button>
        </Container>
      </Card.Body>
    </Card>
  );
}

export default CardPokemon;
