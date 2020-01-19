import React, { Component } from 'react';
import Header from './telas/auxiliar/Header.js'
import Home from './telas/Home.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Home />
      </div>
    );
  }
}

export default App;
