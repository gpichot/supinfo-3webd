import React from "react";
import { useSearchParams } from "react-router-dom";
import { CircularProgress, TextField } from "@mui/material";

import { usePokemonListQuery } from "../queries";
import PokemonCard from "./PokemonCard";
import PokemonList from "./PokemonList";

import "../../globals.scss";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get("searchText") || "";

  const pokemonListQuery = usePokemonListQuery({ searchText });

  if (pokemonListQuery.isLoading) return <p>Loading</p>;
  if (pokemonListQuery.isError) return <p>Error</p>;

  const { data: pokemons } = pokemonListQuery;
  const filteredPokemons = pokemons.results;
  return (
    <div>
      <h1>Pokedex {pokemonListQuery.isFetching && <CircularProgress />}</h1>
      <TextField
        name="searchText"
        placeholder="Search pokemons..."
        value={searchText}
        style={{
          width: "100%",
          marginBottom: 10,
        }}
        onChange={(e) => setSearchParams({ searchText: e.target.value })}
      />
      <PokemonList>
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </PokemonList>
    </div>
  );
}

export default App;
