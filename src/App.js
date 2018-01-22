import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Todo from './components/Todo';
import About from './components/About';

class App extends Component {
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

// do I need to move everything to a general todo box component that also takes
// individual todo components and use that this-binding thing they recommend everywhere?

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
    const oldTodos = this.state.todos.slice();
    // do I need this? or can I safely just set new todos equal to the filtered state
    // and that won't actually mutate state?
    const newTodos = oldTodos.filter(todo => todo.description !== description);
    this.setState({ todos: [...newTodos] });
  }

  render() {
    return (
      < div className = "App" >
        <header>
        <nav>
          <Link to='/'>To Do List!</Link>
          <Link to='/about'>About</Link>
        </nav>
        <h1>Ultimate ToDo List</h1>
        </header>
        <ul>
          { this.state.todos.map( (todo, index) =>
            <Todo key={ index } description={ todo.description } completed={ todo.completed } deleteTodo={ () => this.deleteTodo(todo.description) } toggleComplete={ () => this.toggleComplete(index) } />
          )}
        </ul>
        <form onSubmit={ (e) => this.handleSubmit(e) }>
           <input type="text" value={ this.state.newTodoDescription } onChange={ (e) => this.handleChange(e) } />
           <input type="submit" />
        </form>
        <main>
          <Route exact="exact" path="/" component={Todo}/>
          <Route path="/about" component={About}/>
        </main>
      < /div>
    );
  }
}

export default App;
