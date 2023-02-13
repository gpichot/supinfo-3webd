import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import PokemonDetails from "./pokemons/components/PokemonDetails";
import App from "./App";
import Root from "./Root";
import * as rootModule from "./Root";

console.log(rootModule);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
