import React, { Component } from 'react';
import './OverviewEntry.css';

class OverviewEntry extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className='entry'>
        <div className='entry-description'>{this.props.name}</div>
        <div className='entry-amount'>${this.props.spent} / ${this.props.amount}</div>
      </div>
    );
  }
}

export default OverviewEntry;
