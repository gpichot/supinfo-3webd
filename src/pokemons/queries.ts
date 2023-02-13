import { useQuery } from "@tanstack/react-query";

import { PokemonType } from "@/types";

const baseUrl = "https://pokeapi.fly.dev/3webd";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export function usePokemonListQuery({
  searchText = "",
}: { searchText?: string } = {}) {
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
