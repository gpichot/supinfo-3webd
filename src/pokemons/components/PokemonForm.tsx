import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { create } from "@mui/material/styles/createTransitions";

import { useCreatePokemonMutation } from "../mutations";
import { PokemonFormValues } from "../types";

function Control({ children }: { children: React.ReactNode }) {
  return <div style={{ width: "100%", margin: "5px 0" }}>{children}</div>;
}

export default function PokemonForm() {
  const [values, setValues] = React.useState<PokemonFormValues>({
    name: "",
    type: "",
    height: 0,
    weight: 0,
  });
  const navigate = useNavigate();

  const createPokemonMutation = useCreatePokemonMutation({
    onSuccess: () => {
      alert("Pokemon created");
      navigate("/");
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createPokemonMutation.mutate(values);
  };

  return (
    <form
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "stretch",
      }}
      onSubmit={handleSubmit}
    >
      <Control>
        <TextField
          label="name"
          type="text"
          name="name"
          id="name"
          value={values.name}
          onChange={handleChange}
        />
      </Control>
      <Control>
        <TextField
          label="Type"
          type="text"
          name="type"
          id="type"
          value={values.type}
          onChange={handleChange}
        />
      </Control>
      <Control>
        <TextField
          label="Height"
          type="number"
          name="height"
          id="height"
          value={values.height}
          onChange={handleChange}
        />
      </Control>
      <Control>
        <TextField
          label="Weight"
          type="number"
          name="weight"
          id="weight"
          value={values.weight}
          onChange={handleChange}
        />
      </Control>
      <button type="submit" disabled={createPokemonMutation.isLoading}>
        Submit
      </button>
    </form>
  );
}
