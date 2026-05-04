import './Card.css'
function Card({ pokemon }) {
  return (
    <div className="card">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.img} alt={pokemon.name} />
      <p><strong>Tipo:</strong> {pokemon.type}</p>
      <p><strong>Peso:</strong> {pokemon.weight}</p>
      <p><strong>Altura:</strong> {pokemon.height}</p>
    </div>
  );
}

export default Card;