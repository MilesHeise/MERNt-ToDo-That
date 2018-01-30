import React, { Component } from 'react';
import style from './style';

class Todo extends Component {
render() {
    return (
      <div style={ style.todo } >
        <li>
           <input type="checkbox" checked={ this.props.completed } onChange={ this.props.onToggle } />
           <span style={ style.description } >{ this.props.description }</span>
           <button onClick={ this.props.onDelete } >Delete?</button>
        </li>
      </div>
    );
  }
}

export default Todo;
