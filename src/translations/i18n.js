import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    resources: {
      es: {
        translation: {
          normal: 'Normal',
          fighting: 'Lucha',
          flying: 'Volador',
          poison: 'Veneno',
          ground: 'Tierra',
          rock: 'Roca',
          bug: 'Bicho',
          ghost: 'Fantasma',
          steel: 'Acero',
          fire: 'Fuego',
          water: 'Agua',
          grass: 'Planta',
          electric: 'Eléctrico',
          psychic: 'Psíquico',
          ice: 'Hielo',
          dragon: 'Dragon',
          dark: 'Siniestro',
          fairy: 'Hada',
          stellar: 'Astral',
          unknown: 'Desconocido',
          shadow: 'Sombra'
        }
      }
    }
})