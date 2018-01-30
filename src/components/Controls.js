import React, { Component } from 'react';
// import style from './style';

class Controls extends Component {
  render() {
    return (
      <div>
      <button onClick={ this.props.removeCompleted } >Remove all completed items?</button>
      <button onClick={ this.props.toggleAll } >Toggle all completed?</button>
      </div>
    );
  }
}

export default Controls;
