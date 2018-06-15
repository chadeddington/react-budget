import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Overview from '../Overview/Overview';
import BudgetView from '../BudgetView/BudgetView';
import Details from '../Details/Details';
import './Routing.css';

class Routing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' render={props => (<Overview budgets={this.props.appState.budgets} />)} />
        <Route path='/budget/:id' render={({match}) => (<BudgetView budget={this.props.appState.budgets[match.params.id]} budgetId={match.params.id}/>)} />
        <Route path='/details' render={props => (<Details appState={this.props} />)} />
      </Switch>
    );
  }
}

export default Routing;