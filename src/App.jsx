import { useState } from 'react'
import './App.css'

import Header from './Header'
import Form from './Form'
import Card from './Card'

function App() {
  const [input, setInput] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getPokemon = async () => {
    const value = input.toLowerCase().trim();

    if (!value) {
      setError("Escribí un Pokémon");
      return;
    }

    setError("");
    setLoading(true);
    setPokemon(null);

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${value}`
      );

      if (!res.ok) {
        throw new Error("Pokémon no encontrado");
      }

      const data = await res.json();

      setPokemon({
        name: data.name,
        img: data.sprites.front_default,
        type: data.types.map((t) => t.type.name).join(", "),
        weight: data.weight,
        height: data.height,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Header />

      <Form
        input={input}
        setInput={setInput}
        onSearch={getPokemon}
      />

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      {pokemon && <Card pokemon={pokemon} />}
    </div>
  );
}

export default App;