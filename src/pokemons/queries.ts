import { useQuery } from "@tanstack/react-query";

import { PokemonType } from "@/types";

import { baseUrl } from "./config";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export function usePokemonListQuery(options: { searchText?: string } = {}) {
  const { searchText = "" } = options;
  return useQuery(
    ["pokemons", { searchText }],
    async () => {
      const response = await fetch(
        `${baseUrl}/pokemons?limit=10&searchText=${searchText}`
      );
      const json = await response.json();
      await sleep();

      return json as {
        results: PokemonType[];
      };
    },
    {
      keepPreviousData: true,
    }
  );
}

export function usePokemonDetailQuery(id: number | null) {
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
