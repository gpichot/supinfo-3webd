import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";

import PokemonDetails from "./pokemons/components/PokemonDetails";
import PokemonForm from "./pokemons/components/PokemonForm";
import PokemonListPage from "./pokemons/components/PokemonListPage";
import Root from "./Root";
import * as rootModule from "./Root";

console.log(rootModule);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: (
      <div>
        <h1>Error</h1>
        <p>There is an error</p>
      </div>
    ),
    children: [
      {
        path: "/",
        element: <PokemonListPage />,
      },
      {
        path: "/pokemons/:pokemonId",
        element: <PokemonDetails />,
      },
      {
        path: "/team",
        element: (
          <div>
            <h1>Team</h1>
            <div>BENG.3 en pleine forme!</div>
          </div>
        ),
      },
      {
        path: "/pokemons/form",
        element: <PokemonForm />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
