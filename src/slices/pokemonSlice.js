import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  datosPokemon: [],
  status: "vacio",
  error: null,
  nextPokemons: "",
  searchStatus: "",
  specificPokemon: {},
  types: [],
};

export const getPokemons = createAsyncThunk(
  "pokemons/getPokemons",
  async () => {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=9"
    );
    const arrayPokemon = response.data.results.map(async (pokemon) => {
      const responsePokemon = await axios.get(pokemon.url);
      return responsePokemon.data;
    });

    return {
      datosPokemon: await Promise.all(arrayPokemon),
      nextPokemons: response.data.next,
    };
  }
);

export const getNextPokemons = createAsyncThunk(
  "pokemons/getNextPokemons",
  async (nextUrl = "") => {

    /* La función recibe una 'nextUrl' que es puesta en la primera función (getPokemons)
      que es la que está en el main y se ejecuta con un useEffect; una vez ejecutada tenemos
      ese link y lo vamos ejecutando; entonces lo que hacemos es exactamente lo anterior
    */
    const response = await axios.get(nextUrl);

    /* La response viene con la siguiente forma: 
      {
        {
          id: 1,
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/"
        },
        ...,
        ...,
        ...,
      }
    */
   
    const nextPokemons = response.data.results.map(async (pokemon) => {
      const responseNextPokemons = await axios.get(pokemon.url);
      return responseNextPokemons.data;
    });

    /* 
      Por medio de un map iteramos sobre el array de la response y hacemos un fetch a cada uno de las urls de los pokemons
      para pode obtene así los datos, como hacemos un map y a JS no le da el timepo, entonces lo que hacemos es
      agarrar y dejarlo en un array llamado 'nextPokemons' que es el array de las promesas
    */

    const nextPokemon = await Promise.all(nextPokemons);

    /* Resolvemos todas las promesas para dicho array con el método indicado arrriba */

    return {
      datosPokemon: nextPokemon,
      nextPokemons: response.data.next,
    };

    /* cuando devolvemos, lo mandamos con el mismo formato; con los nextPokemons y con los siguientes pokemons*/
  }
);

export const getTypes = createAsyncThunk(
  "pokemons/getTypes",
  async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/type?limit=21");
    return response.data.results
  }
)



export const getPokemon = createAsyncThunk(
  "pokemons/getPokemon",
  async (name = '') => {
    /* Mediante recibir el parámetro de la ID, podemos fetchear a la API específica; el ID lo sacamos por medio del MAP. */
    //! Cambié el link de donde recibe a UN pokemon individual
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

    /* Devolvemos los datos específicos para poder hace el fetch */
    return response.data;
  }
);

export const searchPokemon = createAsyncThunk(
  "pokemons/searchPokemon", async (nombre) => {
    /* Por como funciona la API si ponemos el nombre de 'pika' y este no coincide con ningún pokemon, entonces nos tirará un error 
      Por ende y po lo tanto tiene que ser el nombre completo, lo ideal sería que sea el nombre específico del pokemon.

      Además, para no crear un nuevo estado utilizaé el de specificPokemon.
    */
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    return response.data;
  } 
)

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemon: (state, action) => {
      console.log("Action: ", action.payload)
      state.specificPokemon = action.payload;
    },
    changeSearchStatus: (state, action) => {
      state.searchStatus = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPokemons.pending, (state) => {
        state.status = "Cargando";
      })
      .addCase(getPokemons.fulfilled, (state, action) => {
        state.status = "Exitoso";
        state.datosPokemon = action.payload.datosPokemon;
        state.nextPokemons = action.payload.nextPokemons;
      })
      .addCase(getPokemons.rejected, (state, action) => {
        state.status = "Rechazado";
        state.error = action.error.message;
      })
      .addCase(getNextPokemons.fulfilled, (state, action) => {
        /* En el caso éxitoso, como se muestra lo que haremos será cambiar el estado y proximamente
          actualizar el array de los pokemons con los nuevos pokemons que se obtienen de la API,
          fijese que utilizamos la sintaxis de SPREAD OPERATOR para no tener que mutar el array; a pesar
          de que por como funciona RKT y lo que dijo alejo el .push no muta el array por que así lo permite RKT.
        */
        state.status = "Exitoso";
        state.datosPokemon = [
          ...state.datosPokemon,
          ...action.payload.datosPokemon,
        ];
        state.nextPokemons = action.payload.nextPokemons;
        /* Agarramos la nueva URL para que aún funcione el botón para más y más peticiones. */
      })
      .addCase(getNextPokemons.rejected, (state, action) => {
        state.status = "Rechazado";
        state.error = action.error.message;
      })
      .addCase(getPokemon.pending, (state) => {
        state.status = "Cargando";
      })
      .addCase(getPokemon.rejected, (state, action) => {
        state.status = "Rechazado";
        state.error = action.error.message;
      })
      .addCase(getPokemon.fulfilled, (state, action) => {
        state.status = "Exitoso";
        state.specificPokemon = action.payload;
      })
      .addCase(searchPokemon.fulfilled, (state, action) => {
        state.searchStatus = "Exitoso";
        console.log("Specific Pokemon: ", action.payload)
        state.specificPokemon = action.payload;
      })
      .addCase(searchPokemon.rejected, (state, action) => {
        state.searchStatus = "Rechazado";
        state.error = action.error.message;
      })
      .addCase(searchPokemon.pending, (state) => {
        state.searchStatus = "Cargando";
      })
      .addCase(getTypes.fulfilled, (state, action) => {
        state.types = action.payload;
      });
  },
});

export const { setPokemon, changeSearchStatus } = pokemonSlice.actions;

export default pokemonSlice.reducer;
