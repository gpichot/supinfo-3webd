import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import pokemons from "@/pokemons.json";

import { usePokemonListQuery } from "../queries";
import PokemonListPage from "./PokemonListPage";

jest.mock("../queries");

const usePokemonListQueryMock = usePokemonListQuery as jest.Mock;

function Wrapper({ children }: { children: React.ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

describe("PokemonListPage", () => {
  beforeAll(() => {
    usePokemonListQueryMock.mockReturnValue({
      data: {
        results: pokemons,
      },
    });
  });
  it("displays pokemons", async () => {
    render(<PokemonListPage />, { wrapper: Wrapper });

    expect(screen.getByText("ivysaur")).toBeVisible();
    expect(screen.getByText("bulbasaur")).toBeVisible();
    expect(screen.getByText("venusaur")).toBeVisible();
    expect(screen.getByText(/squirtle/i)).toBeVisible();
  });

  it("filter by term", async () => {
    const user = userEvent.setup();
    render(<PokemonListPage />, { wrapper: Wrapper });

    await user.type(screen.getByRole("textbox"), "chu");

    expect(usePokemonListQueryMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ searchText: "chu" })
    );
  });
});
