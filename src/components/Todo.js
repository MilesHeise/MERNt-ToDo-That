import React, { Component } from 'react';

class Todo extends Component {
  render() {
    return (
      <li>
         <input type="checkbox" checked={ this.props.completed } onChange={ this.props.toggleComplete } />
         <span>{ this.props.description }</span>
         <button onClick={ this.props.deleteTodo } >Delete?</button>
       </li>
    );
  }
}

export default Todo;
