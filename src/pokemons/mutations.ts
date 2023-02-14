import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { PokemonType } from "@/types";

import { baseUrl } from "./config";
import { PokemonFormValues } from "./types";

export function useCreatePokemonMutation(
  options: UseMutationOptions<
    PokemonType,
    unknown,
    PokemonFormValues,
    unknown
  > = {}
) {
  return useMutation(async (payload: PokemonFormValues) => {
    const response = await fetch(`${baseUrl}/pokemons`, {
      body: JSON.stringify(payload),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    return json;
  }, options);
}
