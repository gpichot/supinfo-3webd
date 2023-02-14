import { useQuery } from "@tanstack/react-query";

import { PokemonType } from "@/types";

import { baseUrl } from "./config";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export function usePokemonListQuery(
  options: { searchText?: string; offset?: number; limit?: number } = {}
) {
  const { searchText = "", limit = 9, offset = 0 } = options;
  return useQuery(
    ["pokemons", { searchText, limit, offset }],
    async () => {
      const response = await fetch(
        `${baseUrl}/pokemons?limit=${limit}&searchText=${searchText}&offset=${offset}`
      );
      const json = await response.json();
      await sleep();

      return json as {
        previousOffset: number | null;
        nextOffset: number | null;
        results: PokemonType[];
      };
    },
    {
      keepPreviousData: true,
    }
  );
}

export function usePokemonDetailQuery(id: string | number | null) {
  console.log(`${baseUrl}/pokemons/${id}`);
  return useQuery(
    ["pokemons", id],
    async () => {
      const response = await fetch(`${baseUrl}/pokemons/${id}`);
      const json = await response.json();
      await sleep();

      return json as PokemonType;
    },
    {
      enabled: Boolean(id),
    }
  );
}
