import React, { Component } from 'react';
import style from './style';

class Todo extends Component {
  render() {
    return (
      <div style={ style.todo } >
        <li>
           <input type="checkbox" checked={ this.props.completed } onChange={ this.props.toggleComplete } />
           <span>{ this.props.description }</span>
           <button onClick={ this.props.deleteTodo } >Delete?</button>
        </li>
        </div>
    );
  }
}

export default Todo;
