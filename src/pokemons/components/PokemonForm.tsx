import React from "react";

type PokemonFormValues = {
  name: string;
  type: string;
  height: number;
  weight: number;
};

export default function PokemonForm() {
  const [values, setValues] = React.useState<PokemonFormValues>({
    name: "",
    type: "",
    height: 0,
    weight: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={values.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="type">Type</label>
        <input
          type="text"
          name="type"
          id="type"
          value={values.type}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="height">Height</label>
        <input
          type="number"
          name="height"
          id="height"
          value={values.height}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="weight">Weight</label>
        <input
          type="number"
          name="weight"
          id="weight"
          value={values.weight}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
