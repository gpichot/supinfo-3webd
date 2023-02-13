import PokemonCard from "./pokemons/components/PokemonCard";
import PokemonList from "./pokemons/components/PokemonList";
import pokemons from "./pokemons.json";

import "./globals.scss";

type PokemonList = typeof pokemons;

function App() {
  return (
    <div>
      <h1>Pokedex</h1>
      <PokemonList>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </PokemonList>
    </div>
  );
}

export default App;
