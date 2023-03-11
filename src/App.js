import React, { Component } from 'react';
import Menu from './Menu';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     pokemon:"",
    data:[],
     
      
    };
    this.pokeInput = this.pokeInput.bind(this);
    this.search = this.search.bind(this);
  }
  
  pokeInput(event) {
    this.setState({ pokemon: event.target.value.toLowerCase() })
  };
  search(){
    if(this.state.pokemon.length===0){this.search()}
    else{
    this.setState(prevState => ({
      data: [...prevState.data, this.state.pokemon]
    }))};
  }

  render() {
   
    return (
      <div>
        <h1>Pokedex</h1>
        <hr></hr>
        <input type="text" placeholder='Indique el pokemon' onChange={this.pokeInput}></input>
       <button onClick={this.search}>Buscar</button>

       <Menu  personajes={this.state.data}/>
      
      </div>
    );
  }
}

export default App;