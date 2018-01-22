import React, { Component } from 'react';
import Todo from './Todo';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { description: 'Walk the cat', completed: true },
        { description: 'Throw the dishes away', completed: false },
        { description: 'Buy new dishes', completed: false }
      ],
      newTodoDescription: ''
    };
  }

  toggleComplete(index) {
    const todos = this.state.todos.slice();
    const todo = todos[index];
    todo.completed = todo.completed ? false : true;
    this.setState({ todos: todos });
  }

  handleChange(e) {
     this.setState({ newTodoDescription: e.target.value })
   }

   handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newTodoDescription) { return }
    const newTodo = { description: this.state.newTodoDescription, isCompleted: false };
    this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '' });
   }

   deleteTodo(description) {
    const newTodos = this.state.todos.filter(todo => todo.description !== description);
    this.setState({ todos: [...newTodos] });
  }

  render() {
    return (
      <div>
        <ul>
          { this.state.todos.map( (todo, index) =>
            <Todo key={ index } description={ todo.description } completed={ todo.completed } deleteTodo={ () => this.deleteTodo(todo.description) } toggleComplete={ () => this.toggleComplete(index) } />
          )}
        </ul>
        <form onSubmit={ (e) => this.handleSubmit(e) }>
          <input type="text" value={ this.state.newTodoDescription } onChange={ (e) => this.handleChange(e) } />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default TodoList;
