import React, { Component } from 'react';
import './App.css';
import Map from './Map/Map'
import CoronaPanel from './Corona-Panel/Corona-Panel'
import Legend from './Map/Legend/Legend'

class App extends Component {

  state = { map: '' }

  getMap = (map) => {
    this.setState({ map: map });
  }

  render() {
    return (
      <div>
        <Map onMapSet={this.getMap} />
        <CoronaPanel map={this.state.map} />
        <Legend />
      </div>
    );
  }
}

export default App;
