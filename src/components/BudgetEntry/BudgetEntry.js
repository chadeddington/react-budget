import React, { Component } from 'react';
import './BudgetEntry.css';

class BudgetEntry extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className='entry'>
        <div className='entry-description'>{this.props.description}</div>
        <div className='entry-amount'>${this.props.amount}</div>
      </div>
    );
  }
}

export default BudgetEntry;
