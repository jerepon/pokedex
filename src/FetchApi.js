import React, { Component } from 'react';

export default class FetchApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeapi: null,
    };
  }

  componentDidMount() {
    const url = `https://pokeapi.co/api/v2/pokemon/${this.props.personajes[this.props.personajes.length - 1]}/`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const hp = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
        const weight = data.weight;
        const type = data.types.map(type => type.type.name).join(', ');
        const image = data.sprites.front_default;
        this.setState({
          pokeapi: {
            hp: hp,
            weight: weight,
            type: type,
            image: image
          }
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { pokeapi } = this.state;

    if (!pokeapi) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <img src={pokeapi.image} alt="Pokemon" />
        <p>HP: {pokeapi.hp}</p>
        <p>Weight: {pokeapi.weight}</p>
        <p>Type: {pokeapi.type}</p>
      </div>
    );
  }
}
