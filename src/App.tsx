import React from "react";
import { TextField } from "@mui/material";

import PokemonCard from "./pokemons/components/PokemonCard";
import PokemonList from "./pokemons/components/PokemonList";
import pokemons from "./pokemons.json";

import "./globals.scss";

type PokemonList = typeof pokemons;

function App() {
  const [searchText, setSearchText] = React.useState("");
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.includes(searchText)
  );
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
