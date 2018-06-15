import React, { Component } from 'react';
import './BudgetView.css';
import BudgetEntry from '../BudgetEntry/BudgetEntry';

class BudgetView extends Component {
  constructor(props) {
    super(props);
    this.find = document.querySelector.bind(document);
  }

  updateCircles(spent, budgeted) {
    const total = 377;
    const half = total / 2;
    const circleVal = spent * total / budgeted;
    if (!this.find('#lowerhalf') ||
        !this.find('#upperhalf')) return;
    if (circleVal > half) {
      this.find('#lowerhalf').style.strokeDasharray = `${half} ${total}`;
      this.find('#upperhalf').style.strokeDasharray = `${circleVal} ${total}`;
    } else {
      this.find('#lowerhalf').style.strokeDasharray = `${circleVal} ${total}`;
      this.find('#upperhalf').style.strokeDasharray = `0 ${total}`;
    }
  }

  componentWillMount() {
    const eventDetails = {}
    
    eventDetails.budgetIndex = this.props.budgetId;
    
    var event = new CustomEvent("set-current-budget", {
      detail: eventDetails,
      bubbles: true,
      composed: true
    });
    document.dispatchEvent(event);
  }


  render() {
    console.log('budget', this.props);
    const amount = this.props.budget.amount;
    const remaining = this.props.budget.remaining;
    const spent = amount - remaining;

    const fillPercent = (spent / amount * 100) + '%';
    const spentLabel = 100 - (spent / amount * 100);

    const entries = [];
    this.updateCircles(spent, amount);

    this.props.budget.entries.forEach(entry => {
      entries.push(<BudgetEntry amount={entry.amount} description={entry.description}/>)
    })

    return (
      <div className='budget-container'>
        <div className='budget-data'>
          <div className='top-row'>
            <div className='budget-group'>
              <span className='budget-text'>BUDGET</span><span>${this.props.budget.amount}</span>
            </div>
            <div className='spent-group'>
              <span className='spent-text'>SPENT</span><span>${spent || ''}</span>
            </div>
          </div>

          <div className='available-group'>
            <span className='available-text'>AVAILABLE</span><span>${remaining}</span>
          </div>
        </div>
        
        <div className='graph-container'>
          <svg className='pie-svg' width='200' height='200'>
            <defs>
              <linearGradient id="linear" x1="100%" y1="100%" x2="0%" y2="80%">
                <stop offset="0%"   stop-color="red"/>
                <stop offset="100%" stop-color="lightgreen"/>
              </linearGradient>
            </defs>
            <circle id='emptyspace' r="60" cx="100" cy="100"></circle>
            <circle id='upperhalf' r="60" cx="100" cy="100" stroke-dasharray></circle>
            <circle id='lowerhalf' r="60" cx="100" cy="100"></circle>
          </svg>
          <svg id='addIcon' width="58" height="58" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 0C13.44 0 0 13.44 0 30C0 46.56 13.44 60 30 60C46.56 60 60 46.56 60 30C60 13.44 46.56 0 30 0ZM45 33H33V45H27V33H15V27H27V15H33V27H45V33Z" transform="translate(6 6)" fill="#27AE60"/>
          </svg>
          <span className='spent'>
            {fillPercent}
          </span>
        </div>
        {entries}
      </div>
    );
  }
}

export default BudgetView;