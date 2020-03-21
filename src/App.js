import React, { Component } from 'react';
import './App.css';
import Map from './Map/Map'
import CoronaCount from './Map/Corona-Count/Corona-Count'
import Legend from './Map/Legend/Legend'

class App extends Component {

  state = { map: '' }

  getMap = (map) => {
    this.setState({ map: map });
  }

  render() {
    return (
      <div>
        <Map onMapSet={this.getMap}></Map>
        <CoronaCount map={this.state.map}></CoronaCount>
        <Legend></Legend>
      </div>
    );
  }
}

export default App;
