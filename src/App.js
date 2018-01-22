import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import TodoList from './components/TodoList';
import About from './components/About';
import Landing from './components/Landing';

class App extends Component {
  render() {
    return (
      < div className = "App" >
        <header>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/todolist'>To Do List!</Link>
        </nav>
        <h1>Ultimate ToDo List</h1>
        </header>
        <main>
          <Route exact path="/" component={Landing}/>
          <Route path="/about" component={About}/>
          <Route path="/todolist" component={TodoList}/>
        </main>
      < /div>
    );
  }
}

export default App;
