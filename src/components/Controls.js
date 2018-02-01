import React, { Component } from 'react';
import style from './style';

class Controls extends Component {
render() {
    return (
      <div>
        <button onClick={ this.props.removeCompleted } style={ style.largeButton } >Remove all completed items</button>
        <button onClick={ this.props.toggleAll } style={ style.largeButton } >Toggle all completed</button>
        <h3>
        <form id='views' style={ style.select } >Which Todos Would You Like to View?
        <select form='views' onChange={ this.props.changeShow } style={ style.select } >
          <option value='all'>All</option>
          <option value='complete'>Only Completed</option>
          <option value='incomplete'>Only Incomplete</option>
        </select>
        </form>
        </h3>
      </div>
    );
  }
}

export default Controls;
