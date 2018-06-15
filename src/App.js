import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Routing from './components/Routing/Routing';
import * as firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyB_C-FwLU98mRdtZdjD-McOQnxbmthI0Rw",
      authDomain: "react-budget-b38c7.firebaseapp.com",
      databaseURL: "https://react-budget-b38c7.firebaseio.com",
      projectId: "react-budget-b38c7",
      storageBucket: "react-budget-b38c7.appspot.com",
      messagingSenderId: "756798029372"
    };
    firebase.initializeApp(config);
    this.database = firebase.database();

    this.state = {
      budgets: [
        { id: 0,
          name: 'Rent',
          amount: 1200,
          remaining: 0,
          entries: [
            { description: 'Test',
              amount: 100
            }
          ]
        },
        { id: 1,
          name: 'Groceries',
          amount: 500,
          remaining: 100,
          entries: [
            { description: 'Groceries long description test going on and on to go over the alloted space',
              amount: 100
            },
            { description: 'Test',
              amount: 100
            },
            { description: 'Another',
              amount: 100
            },
            { description: 'One more',
              amount: 100
            }
          ]
        },
        { id: 2,
          name: 'Cell Phones',
          amount: 100,
          remaining: 0,
          entries: [
            { description: 'Test',
              amount: 100
            }
          ]
        },
        { id: 3,
          name: 'Utilities',
          amount: 250,
          remaining: -100,
          entries: [
            { description: 'Test',
              amount: 340
            }
          ]
        },
        { id: 4,
          name: 'Car Insurance',
          amount: 100,
          remaining: 100,
          entries: [
            { description: 'Test',
              amount: 100
            }
          ]
        },
        { id: 5,
          name: 'Van Payment',
          amount: 200,
          remaining: 0,
          entries: [
            { description: 'Test',
              amount: 100
            }
          ]
        },
        { id: 6,
          name: 'Student Loans',
          amount: 400,
          remaining: 0,
          entries: [
            { description: 'Test',
              amount: 400
            }
          ]
        }
      ],
      currentBudget: {}
    };
  }

  saveToDB() {
    var newEntry = this.database.ref('testData').push();
    newEntry.set({
      username: 'tester',
      email: 'tester@test.com'
    }).then(() => {
      console.log('Saved to DB');
    })
  }

  readFromDB() {
    this.database.ref('testData').once('value').then(function(snapshot) {
      var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      console.log('data:', snapshot.val());
    });
  }

  componentWillMount() {
    document.addEventListener('set-current-budget', function(e) {
      if (e.detail.budgetIndex > -1) {
        const currentBudget = this.state.budgets[e.detail.budgetIndex];
        this.setState({currentBudget: currentBudget});  
      } else {
        this.setState({currentBudget:{}});
      }
      
    }.bind(this))
  }

  render() {
    console.log('Rendering App');
    const pageName = this.state.currentBudget.name || 'Overview';
    return (
      <div className="App">
        <Navbar pageName={pageName} categories={this.state.budgets} />
        <Routing appState={this.state}/>
      </div>
    );
  }
}

export default App;
