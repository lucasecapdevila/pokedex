import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuSword } from "react-icons/lu";
import { FaShieldAlt } from "react-icons/fa";
import { SiSpeedtest } from "react-icons/si";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const PokemonPage = () => {
  //!  Nombre del pokemon que uso como parametro
  const { name } = useParams();
  const { t } = useTranslation();
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
    <main className="mainPage">
      <Container className="bg-light bg-opacity-75 py-4">
        <div className="d-flex flex-column bg-light border rounded-2 my-5 p-2 fw-light robotoFont">
        <h1 className="text-center my-2 ubuntuFont">{name}</h1>
          <div className="d-flex justify-content-around">
            <img className="w-25 rounded-2 bg-dark-subtle" src={infoPokemon?.sprites?.other?.dream_world?.front_default} alt={name} />
            <div className="w-25 ">
              <p className="fs-5">{descPoke}</p>
              <div className={`rounded-4 p-4 ${infoPokemon.types[0].type.name}`}>
                <p>Peso: {infoPokemon.weight / 10} kg</p>
                <p>Altura: {infoPokemon.height / 10} m</p>
                <p><LuSword/> Ataque: {infoPokemon?.stats[1]?.base_stat}</p>
                <p><FaShieldAlt/> Defensa: {infoPokemon?.stats[2]?.base_stat}</p>
                <p><SiSpeedtest /> Velocidad: {infoPokemon?.stats[5]?.base_stat}</p>
              </div>
              <div className="d-flex flex-column mt-4">
                <h3>Tipo:</h3>
                <p className="w-100 align-self-center">
                  {infoPokemon.types.map((tipo) => (
                    <span key={tipo.type.name} className={`fw-bold fs-2 px-4 PixelifyFont tipoPokemon ${tipo.type.name}`}>
                      {
                        t(tipo.type.name)
                      }
                    </span>
                  ))}
                </p>
              </div>

            </div>
          </div>
          <h2 className="text-center my-4">Evoluciones</h2>

        </div>
      </Container>
    </main>
  );
};

export default PokemonPage;
