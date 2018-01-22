import React, { Component } from 'react';

class Todo extends Component {
  // doesn't this need constructor props super props?
  render() {
    return (
      <li>
         <input type="checkbox" checked={ this.props.completed } onChange={ this.props.toggleComplete } />
         <span>{ this.props.description }</span>
         <button onclick={ this.props.deleteTodo } >Delete?</button>
       </li>
    );
  }
}

export default Todo;
