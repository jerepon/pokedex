import React, { Component } from 'react';
import axios from 'axios';
import Menu from './Menu';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: "",
      data: [],
      suggestions: [],
      names: []
    };
    this.pokeInput = this.pokeInput.bind(this);
    this.search = this.search.bind(this);
    this.erase = this.erase.bind(this);
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
    this.handleRandomClick = this.handleRandomClick.bind(this);
  }

  componentDidMount() {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000')
      .then(response => {
        const names = response.data.results.map(pokemon => pokemon.name);
        this.setState({ names });
      })
      .catch(error => console.log(error));
  }

  pokeInput(event) {
    const value = event.target.value.toLowerCase();
    const suggestions = this.state.names.filter(name => name.startsWith(value));
    this.setState({ pokemon: value, suggestions });
  };

  search() {
    if (this.state.pokemon.length === 0) {
      this.search();
    } else {
      this.setState(prevState => ({
        data: [...prevState.data, this.state.pokemon]
      }))
    };
  }

  erase() {
    this.setState(prevState => ({
      data: []
    }))
  }

  handleSuggestionClick(suggestion) {
    this.setState({ pokemon: suggestion, suggestions: [] });
  }

  handleRandomClick() {
    const randomIndex = Math.floor(Math.random() * this.state.names.length);
    const randomPokemon = this.state.names[randomIndex];

    this.setState(prevState => ({
      data: [...prevState.data, randomPokemon]
    }), () => {
      if (this.state.data.length < 6) {
        setTimeout(() => {
          this.handleRandomClick();
        }, 10);
      }
     
    });
  }

  render() {
    const { pokemon, data, suggestions } = this.state;

    return (
      <div className='negro'>
        <h1>Pokedex</h1>
        <hr></hr>
        <div className="autocomplete">
          <input type="text" placeholder='Indique el pokemon' value={pokemon} onChange={this.pokeInput} />
          <div className="autocomplete-items">
            {suggestions.map((suggestion, index) =>
              <div key={index} className="autocomplete-item" onClick={() => this.handleSuggestionClick(suggestion)}>
                {suggestion}
              </div>
            )}
          </div>
        </div>
        <button className="search-button" onClick={this.search}>Buscar</button>
        <button onClick={this.erase}>Limpiar</button>
        <button onClick={this.handleRandomClick}>Generar Equipo al Azar</button>

        <Menu personajes={data} />
      </div>
    );
  }
}

export default App;
