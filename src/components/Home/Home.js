import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    console.log('home', props);
  }

  render() {
    return (
     <div>
      <h1>Home</h1>
     </div>
    );
  }
}

export default Home;