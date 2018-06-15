import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from '../Home/Home';
import Budget from '../Budget/Budget';
import Details from '../Details/Details';
import './Routing.css';

class Routing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' render={props => (<Home appState={this.props} />)} />
        <Route path='/budget/:id' render={({match}) => (<Budget budget={this.props.appState.budgets[match.params.id]} budgetId={match.params.id}/>)} />
        <Route path='/details' render={props => (<Details appState={this.props} />)} />
      </Switch>
    );
  }
}

export default Routing;