import React, { Component } from 'react'
import FetchApi from './FetchApi'
export default class Menu extends Component {
  

  render() {
    return (
      <div className='pokecontainer'>
        <ul >
       {this.props.personajes.map(personaje => (
          <li className='pokecard' key={personaje}>
            <h3>{personaje}</h3>
         <FetchApi personajes={this.props.personajes}/>
            
            </li>
          
        ))}
        </ul>
        </div>
    )
  }
}
