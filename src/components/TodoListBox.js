import React, { Component } from 'react';
import axios from 'axios';
import Controls from './Controls';
import List from './List';
import Form from './Form';
import style from './style';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodoDescription: '',
      show: 'all'
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

  changeShow(e) {
    this.setState({ show: e.target.value });
  }

  toggleComplete(id) {
    const todos = this.state.todos.slice();
    const todo = todos.find(todo => todo._id === id);
    todo.completed = todo.completed ? false : true;
    axios.put(`http://localhost:3001/api/todos/${id}`, {completed: todo.completed} )
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
    axios.delete('http://localhost:3001/api/remove-completed')
      .then(res => {
        const newTodos = this.state.todos.filter(todo => !todo.completed);
        this.setState({ todos: [...newTodos] });
      })
      .catch(err => {
        console.error(err);
      });
  }

  passUpdate(id, desc) {
    const todos = this.state.todos.slice();
    const todo = todos.find(todo => todo._id === id);
    todo.description = desc;
    this.setState({ todos: todos });
  }

  toggleAll() {
    const allDone = this.state.todos.filter(todo => !todo.completed);
    const boolean = allDone.length === 0
    const newTodos = boolean ?
      this.state.todos.map( todo => {todo.completed = false; return todo}) :
      this.state.todos.map( todo => {todo.completed = true; return todo});
    axios.put('http://localhost:3001/api/toggle-all', {completed: !boolean} )
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
        <Controls
        removeCompleted={ () => this.removeCompleted() }
        toggleAll={ () => this.toggleAll() }
        changeShow={ (e) => this.changeShow(e) }
        />
        <List
        todos={ this.state.todos }
        deleteTodo={ (id) => this.deleteTodo(id) }
        toggleComplete={ (id) => this.toggleComplete(id) }
        show={ this.state.show }
        passUpdate={ (id, desc) => this.passUpdate(id, desc) }
        />
        <Form
        submit={ (e) => this.handleSubmit(e) }
        value={ this.state.newTodoDescription }
        change={ (e) => this.handleChange(e) }
        type='Add New?'
        />
      </div>
    );
  }
}

export default TodoList;
