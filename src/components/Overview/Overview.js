import React, { Component } from 'react';
import './Overview.css';
import OverviewEntry from '../OverviewEntry/OverviewEntry';

class Overview extends Component {
  constructor(props) {
    super(props);
    console.log('Overview', props);
  }

  render() {
    const entries = [];
    this.props.budgets.forEach(entry => {
      let spent = entry.amount - entry.remaining;
      if (entry.remaining < 0) spent = entry.amount;
      entries.push(<OverviewEntry name={entry.name} amount={entry.amount} spent={spent}/>)
    })

    return (
     <div className='overview-wrapper'>
      <h1>Overview</h1>
      {entries}
     </div>
    );
  }
}

export default Overview;