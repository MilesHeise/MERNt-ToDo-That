import React, { Component } from 'react';
import Todo from './Todo';
// import style from './style';

class List extends Component {
  toggle(id) {
    this.props.toggleComplete(id);
  }

  delete(id) {
    this.props.deleteTodo(id);
  }

  render() {
    return (
      <ul>
        { this.props.todos.map( (todo, index) =>
          <Todo
          key={ index }
          description={ todo.description }
          completed={ todo.completed }
          onDelete={ (id) => this.delete(todo._id) }
          onToggle={ (id) => this.toggle(todo._id) }
          />
        )}
      </ul>
    );
  }
}

export default List;
