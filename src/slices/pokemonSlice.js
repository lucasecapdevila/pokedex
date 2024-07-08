import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  datosPokemon: [],
  status: 'vacio',
  error: null,
  nextPokemons: []
}

export const getPokemons = createAsyncThunk('pokemons/getPokemons', async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=9')
  const arrayPokemon = response.data.results.map(async (pokemon) => {
    const responsePokemon = await axios.get(pokemon.url)    
    return responsePokemon.data
  })
  
  return await Promise.all(arrayPokemon)
})

export const getNextPokemons = createAsyncThunk('pokemons/getNextPokemons', async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=10&limit=19')

  const responseNext = await axios.get(response.data.next)
  const nextPokemons = responseNext.data.results.map(async (pokemon) => {
    const responseNextPokemons = await axios.get(pokemon.url)    
    return responseNextPokemons.data
  })
  
  return await Promise.all(nextPokemons)
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
      state.datosPokemon = action.payload
    })
    .addCase(getPokemons.rejected, (state, action) => {
      state.status = 'Rechazado';
      state.error = action.error.message;
    })
    .addCase(getNextPokemons.fulfilled, (state, action) => {
      state.status = 'Exitoso';
      state.nextPokemons = action.payload
    });
	},
});

export default pokemonSlice.reducer