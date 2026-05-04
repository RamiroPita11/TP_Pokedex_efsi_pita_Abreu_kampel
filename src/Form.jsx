import './Form.css'
function Form({ input, setInput, onSearch }) {
  return (
    <>
      <input
        type="text"
        placeholder="Escribí un Pokémon..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={onSearch}>Buscar</button>
    </>
  );
}

export default Form;