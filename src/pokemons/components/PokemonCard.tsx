import React from "react";
import { Link } from "react-router-dom";

import { PokemonType } from "@/types";

import styles from "./PokemonCard.module.css";

type PokemonCardProps = {
  pokemon: PokemonType;
};

export default function PokemonCard(props: PokemonCardProps) {
  const { pokemon } = props;
  return (
    <div className={styles.card}>
      <div>{pokemon.name}</div>
      <img src={pokemon.image} alt={pokemon.name} height={96} width={96} />
      <Link to={`/pokemons/${pokemon.id}`}>Details</Link>
    </div>
  );
}
