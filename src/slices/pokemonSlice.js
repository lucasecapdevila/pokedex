import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  datosPokemon: [],
  status: 'vacio',
  error: null,
  pokemon: {}
}

export const getPokemons = createAsyncThunk('pokemons/getPokemons', async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10')
  
  const arrayPokemon = response.data.results.map(async (pokemon) => {
    const responsePokemon = await axios.get(pokemon.url)    
    return responsePokemon.data
  })

  return await Promise.all(arrayPokemon)
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
      console.log(action.payload)
      state.status = 'Exitoso'
      state.datosPokemon = action.payload
    })
    .addCase(getPokemons.rejected, (state, action) => {
      state.status = 'Rechazado';
      state.error = action.error.message;
    });
	},
});

export default pokemonSlice.reducer