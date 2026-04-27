import { useState } from 'react'
import './App.css'

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
      <h1>Mini Pokédex</h1>

      <input
        type="text"
        placeholder="Escribí un Pokémon..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={getPokemon}>Buscar</button>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {pokemon && (
        <div className="card">
          <h2>{pokemon.name}</h2>
          <img src={pokemon.img} alt={pokemon.name} />
          <p><strong>Tipo:</strong> {pokemon.type}</p>
          <p><strong>Peso:</strong> {pokemon.weight}</p>
          <p><strong>Altura:</strong> {pokemon.height}</p>
        </div>
      )}
    </div>
  );
}

export default App
