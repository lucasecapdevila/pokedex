import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "../slices/pokemonSlice";
import loadingSlice from "../slices/loadingSlice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice,
    spinner: loadingSlice
  }
})