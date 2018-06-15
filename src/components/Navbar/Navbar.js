import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {showMenu: false};
  }

  toggleMenu() {
    console.log('toggle');
    const menu = document.querySelector('#sideMenu');
    if (this.state.showMenu) {
      menu.classList.remove('show-menu');
      menu.classList.add('hide-menu');
    } else {
      menu.classList.remove('hide-menu');
      menu.classList.add('show-menu');
      menu.focus();
    }
    this.setState({showMenu: !this.state.showMenu});
  }

  handleNav(e) {
    const budgetIndex = e.target.getAttribute('data-index');
    const eventDetails = {}
    if (budgetIndex) {
      eventDetails.budgetIndex = parseInt(budgetIndex);
    }
    var event = new CustomEvent("set-current-budget", {
      detail: eventDetails,
      bubbles: true,
      composed: true
    });
    document.dispatchEvent(event);
    this.toggleMenu();
  }

  createNewBudget() {
    console.log('Create a new Budget!')
  }

  render() {
    const budgets = this.props.categories.map((budget, i) => (
      <div className='budget-link'>
        <Link data-index={budget.id} to={'/budget/' + budget.id} onClick={this.handleNav.bind(this)}>{budget.name}</Link>
      </div>
    ))

    budgets.unshift((
      <div className='budget-link home-link'>
        <Link to={'/'} onClick={this.handleNav.bind(this)}>Overview</Link>
      </div>
    ))

    return (
      <nav>
        <h1 className='budget-name'>{this.props.pageName.toUpperCase()}</h1>

        <span className='menu-icon' onClick={this.toggleMenu.bind(this)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path fill='white' d="M3 18h16v-2H3v2zm0-5h16v-2H3v2zm0-7v2h16V6H3z"/>
          </svg>
        </span>

        <svg id='editIcon' width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 20.7849V26.2536H5.46875L21.5979 10.1245L16.1292 4.65573L0 20.7849ZM25.8271 5.89531C26.3958 5.32656 26.3958 4.40781 25.8271 3.83906L22.4146 0.426562C21.8458 -0.142188 20.9271 -0.142188 20.3583 0.426562L17.6896 3.09531L23.1583 8.56406L25.8271 5.89531V5.89531Z" transform="translate(0.375 0.37146)" fill="white"/>
        </svg>


        <aside id='sideMenu' tabIndex='0' className='side-menu'>
          <h1>Categories</h1>

          <form action='javascript:void(0);' onSubmit={this.createNewBudget.bind(this)} className='new-budget-form'>
            <input type='text' className='new-budget-input' />
            <input type='submit' className='submit-btn' value='Search' />
          </form>

          <div className='budget-list'>

          {budgets}

          </div>

        </aside>
      </nav>
    );
  }
}

export default Navbar;