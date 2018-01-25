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
    // do I need this bind here?
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
    this.setState({ todos: todos });
  }

  handleChange(e) {
     this.setState({ newTodoDescription: e.target.value })
   }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newTodoDescription) { return }
    const newTodo = { description: this.state.newTodoDescription, completed: false };
    axios.post('http://localhost:3001/api/todos', newTodo)
      // .then(res => {
      //     this.setState({ newTodoDescription: '' });
      //     this.loadTodosFromServer();
      //     // when I did both in set state it gave me an error because it was unmounted
      //     // but this workaround I tried really shouldn't actually assure it is mounted
      //     // either. I think it is just wasting enough time on two requests that it mounts
      //     // which is a dumb solution, I should fix this
      // not 100% sure it was a mounting issue though, may have been some kind of a
      // "this" issue? also got an error saying this.state.todos.map is not a function?
      // })
      .catch(err => {
        console.error(err);
      })
    this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '' });
    // so, doing it this way instead works. it does mean that a failed post will show
    // up, and then disappear again almost instantly because of the 2 second updates
    // this works but it isn't ideal, I don't think?
  }

   deleteTodo(id) {
    axios.delete(`http://localhost:3001/api/todos/${id}`)
      .then(res => {
        console.log('delete successful');
      })
      .catch(err => {
        console.error(err);
      });
    const newTodos = this.state.todos.filter(todo => todo._id !== id);
    this.setState({ todos: [...newTodos] });
  }

  render() {
    return (
      <div style={ style.list } >
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
