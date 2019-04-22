import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import Demo from './Demo';

// Stylesheets
import 'react-circular-progressbar/dist/styles.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Demo />
      </div>
    );
  }
}

export default App;
