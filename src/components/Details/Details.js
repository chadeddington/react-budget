import React, { Component } from 'react';
import './Details.css';

class Details extends Component {
  constructor(props) {
    super(props);
    console.log('details', props);
  }

  render() {
    return (
      <div>
        <h1>Details</h1>
      </div>
    );
  }
}

export default Details;