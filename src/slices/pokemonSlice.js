import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  datosPokemon: [],
  status: 'vacio',
  error: null,
  nextPokemons: "",
}

export const getPokemons = createAsyncThunk('pokemons/getPokemons', async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=9')
  const arrayPokemon = response.data.results.map(async (pokemon) => {
    const responsePokemon = await axios.get(pokemon.url)    
    return responsePokemon.data
  })

  return {
    datosPokemon: await Promise.all(arrayPokemon),
    nextPokemons: response.data.next
  }
})

export const getNextPokemons = createAsyncThunk('pokemons/getNextPokemons', async (nextUrl = "") => {
  const response = await axios.get(nextUrl)

  // const responseNext = await axios.get(response.data.next)
  const nextPokemons = response.data.results.map(async (pokemon) => {
    const responseNextPokemons = await axios.get(pokemon.url)    
    return responseNextPokemons.data
  })

  const nextPokemon = await Promise.all(nextPokemons)
  
  return {
    datosPokemon: nextPokemon,
    nextPokemons: response.data.next
  }
})

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPokemons.pending, (state) => {
      state.status = 'Cargando';
    })
    .addCase(getPokemons.fulfilled, (state, action) => {
      state.status = 'Exitoso'
      state.datosPokemon = action.payload.datosPokemon
      state.nextPokemons = action.payload.nextPokemons
    })
    .addCase(getPokemons.rejected, (state, action) => {
      state.status = 'Rechazado';
      state.error = action.error.message;
    })
    .addCase(getNextPokemons.fulfilled, (state, action) => {
      state.status = 'Exitoso';
      state.datosPokemon = [...state.datosPokemon, ...action.payload.datosPokemon]
      state.nextPokemons = action.payload.nextPokemons
      // state.nextPokemons = action.payload
    });
	},
});

export default pokemonSlice.reducer