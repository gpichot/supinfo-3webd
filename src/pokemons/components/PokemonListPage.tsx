import React from "react";
import { useSearchParams } from "react-router-dom";
import { CircularProgress, TextField } from "@mui/material";

import { usePokemonListQuery } from "../queries";
import PokemonCard from "./PokemonCard";
import PokemonList from "./PokemonList";

import "../../globals.scss";

export default function PokemonListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get("searchText") || "";
  const offsetParam = searchParams.get("offset");
  const offset = offsetParam ? parseInt(offsetParam) : 0;
  const limit = 9;

  const pokemonListQuery = usePokemonListQuery({ searchText, offset, limit });

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
      <nav>
        <button
          disabled={!pokemons.previousOffset}
          onClick={() =>
            setSearchParams((prev) => ({
              ...prev,
              offset: pokemons.previousOffset,
            }))
          }
        >
          Previous
        </button>
        <button
          disabled={!pokemons.nextOffset}
          onClick={() =>
            setSearchParams((prev) => ({
              ...prev,
              offset: pokemons.nextOffset,
            }))
          }
        >
          Next
        </button>
      </nav>
      <PokemonList>
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </PokemonList>
    </div>
  );
}
