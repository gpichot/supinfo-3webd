import { Link, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import pokemons from "@/pokemons.json";

import { usePokemonDetailQuery } from "../queries";
import PokemonCard from "./PokemonCard";

export default function PokemonDetails() {
  const { pokemonId } = useParams();
  const id = pokemonId ? parseInt(pokemonId) : null;
  const pokemonDetailQuery = usePokemonDetailQuery(id);

  if (pokemonDetailQuery.isLoading) return <div>Loading</div>;
  if (pokemonDetailQuery.isError) return <div>Error</div>;

  const { data: pokemon } = pokemonDetailQuery;

  if (!pokemon) {
    return <div>Pokemon does not exist.</div>;
  }

  return (
    <div>
      <Link to="/">Accueil</Link>
      <h1>
        {pokemon.name} {pokemonDetailQuery.isFetching && <CircularProgress />}
      </h1>
      <img src={pokemon.image} alt={pokemon.name} />
    </div>
  );
}
