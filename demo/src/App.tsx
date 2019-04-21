import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';

// Stylesheets
import 'react-circular-progressbar/dist/styles.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <CircularProgressbar percentage={66} />
      </div>
    );
  }
}

export default App;
