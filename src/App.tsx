import React from "react";
import { TextField } from "@mui/material";

import PokemonCard from "./pokemons/components/PokemonCard";
import PokemonList from "./pokemons/components/PokemonList";
import { usePokemonListQuery } from "./pokemons/queries";

import "./globals.scss";

function App() {
  const [searchText, setSearchText] = React.useState("");

  const pokemonListQuery = usePokemonListQuery({ searchText });

  if (pokemonListQuery.isLoading) return <p>Loading</p>;
  if (pokemonListQuery.isError) return <p>Error</p>;

  const { data: pokemons } = pokemonListQuery;
  const filteredPokemons = pokemons.results;
  return (
    <div>
      <h1>Pokedex</h1>
      <TextField
        name="searchText"
        placeholder="Search pokemons..."
        value={searchText}
        style={{
          width: "100%",
          marginBottom: 10,
        }}
        onChange={(e) => setSearchText(e.target.value)}
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
