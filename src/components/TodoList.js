import React, { Component } from 'react';
import axios from 'axios';
import Todo from './Todo';
import style from './style';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodoDescription: ''
    };
    this.loadTodosFromServer = this.loadTodosFromServer.bind(this);
  }

  loadTodosFromServer() {
    axios.get('http://localhost:3001/api/todos')
      .then(res => {
        this.setState({ todos: res.data });
      })
      .catch(err => {
        console.error(err);
      })
  }

  componentDidMount() {
    this.loadTodosFromServer();
    setInterval(this.loadTodosFromServer, 2000);
  }

  toggleComplete(id) {
    const todos = this.state.todos.slice();
    const todo = todos.find(todo => todo._id === id);
    todo.completed = todo.completed ? false : true;
    axios.put(`http://localhost:3001/api/todos/${id}`, todo)
      .then(res => {
        this.setState({ todos: todos });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleChange(e) {
     this.setState({ newTodoDescription: e.target.value })
   }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newTodoDescription) { return }
    const newTodo = { description: this.state.newTodoDescription, completed: false };
    axios.post('http://localhost:3001/api/todos', newTodo)
      .then(res => {
        this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '' });
      })
      .catch(err => {
        console.error(err);
      })
  }

   deleteTodo(id) {
    axios.delete(`http://localhost:3001/api/todos/${id}`)
      .then(res => {
        const newTodos = this.state.todos.filter(todo => todo._id !== id);
        this.setState({ todos: [...newTodos] });
      })
      .catch(err => {
        console.error(err);
      });
  }

  removeCompleted() {
    axios.delete('http://localhost:3001/api/all')
      .then(res => {
        const newTodos = this.state.todos.filter(todo => !todo.completed);
        this.setState({ todos: [...newTodos] });
      })
      .catch(err => {
        console.error(err);
      });
  }

  toggleAll() {
    const allDone = this.state.todos.filter(todo => !todo.completed);
    const boolean = allDone.length === 0
    const newTodos = boolean ?
      this.state.todos.map( todo => {todo.completed = false; return todo}) :
      this.state.todos.map( todo => {todo.completed = true; return todo});
    axios.put('http://localhost:3001/api/all', {completed: !boolean} )
      .then(res => {
        this.setState({ todos: [...newTodos] });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div style={ style.list } >
        <button onClick={ () => this.removeCompleted() } >Remove all completed items?</button>
        <button onClick={ () => this.toggleAll() } >Toggle all completed?</button>
        <ul>
          { this.state.todos.map( (todo, index) =>
            <Todo key={ index } description={ todo.description } completed={ todo.completed }
            deleteTodo={ () => this.deleteTodo(todo._id) } toggleComplete={ () => this.toggleComplete(todo._id) } />
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
