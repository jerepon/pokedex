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
    };
    this.pokeInput = this.pokeInput.bind(this);
    this.search = this.search.bind(this);
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

  handleSuggestionClick(suggestion) {
    this.setState({ pokemon: suggestion, suggestions: [] });
  }

  render() {
    const { pokemon, data, suggestions } = this.state;

    return (
      <div>
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

        <Menu personajes={data} />

      </div>
    );
  }
}

export default App;
