import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image } from "react-bootstrap";
import { LuSword } from "react-icons/lu";
import { FaShieldAlt } from "react-icons/fa";
import { SiSpeedtest } from "react-icons/si";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";

const PokemonPage = () => {
  //!  Nombre del pokemon que uso como parametro
  const { name } = useParams();
  const [descPoke, setDescPoke] = useState("");

  const getAdditionalInformation = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    /* En data.flavor_text_entries[array] 
      anda la descripción en español; hay que buscarla
    */

    setDescPoke(
      data?.flavor_text_entries?.find(
        (entry) => entry.language.name === "es"
      ).flavor_text
    )
  };

  const infoPokemon = useSelector((state) => state.pokemon.specificPokemon);

  useEffect(() => {
    getAdditionalInformation(infoPokemon?.species?.url)
  }, []);

  return (
    <div className="d-flex min-h-screen w-full bg-primary">
      <aside className="flex flex-col items-center gap-6 border-r bg-background p-6">
        <div className="rounded-full bg-primary p-4 text-6xl text-primary-foreground">
          <Image
            variant="top"
            className="h-100 hoverCard"
            src={infoPokemon?.sprites?.other?.dream_world?.front_default}
          />
        </div>
        <Container>

          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <div className="text-sm text-muted-foreground">
              Peso: {infoPokemon.weight / 10} kg
            </div>
            <div className="text-sm text-muted-foreground">
              Altura: {infoPokemon.height / 10} m
            </div>
          </div>
          <Row  sm={1} md={3} className="mt-4 mt-md-2">
            <Col className="d-flex flex-column align-items-center justify-content-center">
                <LuSword/>
                <div>Ataque</div>
                {/* <div className="font-medium">{infoPokemon?.stats[1]?.base_stat}</div> */}
            </Col>
            <Col className="d-flex flex-column align-items-center justify-content-center">
                <FaShieldAlt />
                <div>Defensa</div>
                {/* <div className="font-medium">{infoPokemon?.stats[2]?.base_stat}</div> */}
            </Col>
            <Col className="d-flex flex-column align-items-center justify-content-center">
                <SiSpeedtest />
                <div>Velocidad</div>
                {/* <div className="font-medium">{infoPokemon?.stats[5]?.base_stat}</div> */}
            </Col>
          </Row>
        </Container>
      </aside>

      <div className="flex-1 p-6">
        <div className="prose max-w-2xl">
          {/* {console.log(infoPokemon.species.url)} */}
          <h1>{name}</h1>
          <p>
            {
              descPoke ? descPoke : "No hay una descripción aún"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
