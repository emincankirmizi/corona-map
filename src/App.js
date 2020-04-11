import React, { Component } from 'react';
import './App.css';
import Map from './Map/Map'
import CoronaPanel from './Corona-Panel/Corona-Panel'
import Legend from './Map/Legend/Legend'

class App extends Component {

  state = {
    map: '',
    languageCode: 1
  }

  getMap = (map) => {
    this.setState({ map: map });
  }

  setLanguageCode = (code) => {
    this.setState({ languageCode: code });
  }

  render() {
    return (
      <div>
        <Map onMapSet={this.getMap} />
        <CoronaPanel map={this.state.map} onSetLocalization={this.setLanguageCode} />
        <Legend languageCode={this.state.languageCode}/>
      </div>
    );
  }
}

export default App;
