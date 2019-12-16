import React from 'react';
import { Link } from 'react-router-dom';
import { getPokemons } from '../services/pokemons.js'


class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: [],
      isLoading: false,
      error: null,
      searchWord: ""
    }
  }


  

  async componentDidMount() {
    this.setState({
      isLoading: true
    });
    const response = await getPokemons();
    const pokemons = response.results;
    this.setState({
      pokemons,
      isLoading: false,
    })
  }

  handleChange (event) {
    const input = event.target.value;
    this.setState({ searchWord: input });
  }

  render() {
    const { pokemons, isLoading, error, searchWord } = this.state;

    if (error) {
      return (
        <div>
          <p>Oops! Something went wrong!</p>
          <pre>{error.message}</pre>
        </div>
      )
    }

    if(isLoading) {
      return(
        <div>
          <p>The page is loading....</p>
        </div>
      )
    }

    let pokemonElements = [];

    pokemonElements = pokemons
      .filter(pokemon => pokemon.name.toLowerCase().includes(searchWord.toLowerCase()))
      .map((pokemon) => {
      
        const url = pokemon.url.split('/');
        const pokeId = (url[url.length-2]);

        return (
          <div key={pokeId} className="pokeCard">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`} alt="pokemon"/>
            
            <h3>{`${pokeId} - ${pokemon.name.toUpperCase()}`}</h3>
          </div>
        )
      });
  
    return (
      <div>
        <header>
          <h1 >POKEDEX</h1>
          <input 
            type="text"  
            onChange={this.handleChange.bind(this)}
            value={searchWord || ''} 
          />
        </header>
        <div className="container">{pokemonElements}</div>
      </div>
    );
  }
}

export default Overview;