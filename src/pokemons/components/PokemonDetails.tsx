import { Link, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import pokemons from "@/pokemons.json";

import { usePokemonDetailQuery } from "../queries";
import PokemonCard from "./PokemonCard";

export default function PokemonDetails() {
  const { pokemonId } = useParams();
  const pokemonDetailQuery = usePokemonDetailQuery(pokemonId || null);

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
      <h2>Stats</h2>
      <ul>
        <li>HP: {pokemon.stats.hp}</li>
        <li>Defense: {pokemon.stats.defense}</li>
        <li>Attack: {pokemon.stats.attack}</li>
      </ul>
    </div>
  );
}
