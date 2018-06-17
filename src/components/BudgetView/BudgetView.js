import React, { Component } from 'react';
import './BudgetView.css';
import BudgetEntry from '../BudgetEntry/BudgetEntry';
import AddEntry from '../AddEntry/AddEntry';

class BudgetView extends Component {
  constructor(props) {
    super(props);
    this.find = document.querySelector.bind(document);
    this.state = {entries: []};
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
  componentDidMount() {
    let entries = this.state.entries;
    this.props.budget.entries.forEach(entry => {
      entries.push(<BudgetEntry amount={entry.amount} description={entry.description}/>)
    })
    this.setState({entries: entries});
  }

  handleSubmission(result) {
    console.log('result', result);
    let entries = [].concat(this.state.entries);
    entries.push(<BudgetEntry amount={result.value} description={result.label}/>);
    this.setState({entries: entries});
  }

  render() {
    console.log('budget', this.props);
    const amount = this.props.budget.amount;
    const remaining = this.props.budget.remaining;
    const spent = amount - remaining;

    const fillPercent = (spent / amount * 100) + '%';
    const spentLabel = 100 - (spent / amount * 100);

    this.updateCircles(spent, amount);

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
          <AddEntry dialogLabel="Entry" handleSubmission={this.handleSubmission.bind(this)}/>
          <span className='spent'>
            {fillPercent}
          </span>
        </div>
        {this.state.entries}
      </div>
    );
  }
}

export default BudgetView;