import React, { Component } from 'react';
import './AddEntry.css';

class AddEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {showDialog: false};
  }

  render() {
    return (
      <div>  
        <svg id='addIcon' onClick={() => this.setState({showDialog: true})} width="58" height="58" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 0C13.44 0 0 13.44 0 30C0 46.56 13.44 60 30 60C46.56 60 60 46.56 60 30C60 13.44 46.56 0 30 0ZM45 33H33V45H27V33H15V27H27V15H33V27H45V33Z" transform="translate(6 6)" fill="#27AE60"/>
        </svg>
        <div hidden={!this.state.showDialog}>
          <div onClick={() => this.setState({showDialog: false})} className='dialog-overlay' />      
          <div className='dialog-container flex-column'>
            <h2>Add {this.props.dialogLabel}</h2>  
            <input placeholder="Label" />
            <input placeholder="Value"/>
            <button className="entry-btn">Add</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddEntry;