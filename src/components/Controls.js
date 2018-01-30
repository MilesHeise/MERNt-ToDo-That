import React, { Component } from 'react';
// import style from './style';

class Controls extends Component {
render() {
    return (
      <div>
        <button onClick={ this.props.removeCompleted } >Remove all completed items?</button>
        <button onClick={ this.props.toggleAll } >Toggle all completed?</button>
        <form id='views'>
        </form>
        <select form='views' onChange={ this.props.changeShow } >
          <option value='all'>All</option>
          <option value='complete'>Only Completed</option>
          <option value='incomplete'>Only Incomplete</option>
        </select>
      </div>
    );
  }
}

export default Controls;
