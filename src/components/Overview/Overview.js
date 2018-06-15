import React, { Component } from 'react';
import './Overview.css';

class Overview extends Component {
  constructor(props) {
    super(props);
    console.log('Overview', props);
  }

  render() {
    return (
     <div style={{marginTop: '50px'}}>
      <h1>Overview</h1>
     </div>
    );
  }
}

export default Overview;