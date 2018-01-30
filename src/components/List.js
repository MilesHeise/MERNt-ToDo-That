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

  selectView(view) {
    let list = this.props.todos;
    switch (view) {
      case 'complete':
        return list.filter(todo => todo.completed);
      case 'incomplete':
        return list.filter(todo => !todo.completed);
      case 'all':
      default:
        return list;
    }
  }

  render() {
    const todoList = this.selectView(this.props.show);

    return (
      <ul>
        { todoList.map( (todo, index) =>
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
