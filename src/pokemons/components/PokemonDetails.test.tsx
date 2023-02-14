import React from "react";
import { MemoryRouter, useParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";

import pokemons from "@/pokemons.json";

import { usePokemonDetailQuery } from "../queries";
import PokemonDetails from "./PokemonDetails";

jest.mock("../queries");

const usePokemonDetailQueryMock = usePokemonDetailQuery as jest.Mock;

function Wrapper({ children }: { children: React.ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

describe("PokemonDetails", () => {
  it("display pokemon name", async () => {
    usePokemonDetailQueryMock.mockReturnValue({
      data: pokemons[0],
    });
    render(<PokemonDetails />, { wrapper: Wrapper });

    expect(
      screen.getByRole("heading", {
        name: /bulbasaur/i,
      })
    ).toBeVisible();
  });

  it("displays pokemon stats", () => {
    usePokemonDetailQueryMock.mockReturnValue({
      data: pokemons[0],
    });
    render(<PokemonDetails />, { wrapper: Wrapper });

    expect(screen.getByText("HP: 45")).toBeVisible();
    expect(screen.getByText("Defense: 49")).toBeVisible();
    expect(screen.getByText("Attack: 49")).toBeVisible();
  });
});
