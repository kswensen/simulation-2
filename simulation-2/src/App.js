import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Listing from './components/Listing';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Listing />
      </div>
    );
  }
}

export default App;
