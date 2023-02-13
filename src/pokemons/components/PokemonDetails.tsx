import { Link, useParams } from "react-router-dom";

import pokemons from "@/pokemons.json";

import PokemonCard from "./PokemonCard";

export default function PokemonDetails() {
  const { pokemonId } = useParams();
  const id = pokemonId ? parseInt(pokemonId) : null;
  const pokemon = pokemons.find((p) => p.id === id);

  if (!pokemon) {
    return <div>Pokemon does not exist.</div>;
  }

  return (
    <div>
      <Link to="/">Accueil</Link>
      <h1>{pokemon.name}</h1>
    </div>
  );
}
