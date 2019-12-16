
const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

export function getPokemons() {
  return fetch(API_URL)
  .then(res => res.json());
}


