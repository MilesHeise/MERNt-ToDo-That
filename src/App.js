import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import TodoListBox from './components/TodoListBox';
import About from './components/About';
import Landing from './components/Landing';
import style from './style';

class App extends Component {
  render() {
    return (
      <div>
        <header>
        <ul style={ style.navbar } >
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/todolist'>To Do List!</Link></li>
        </ul>
        <h1 style={ style.header } >Ultimate ToDo List</h1>
        </header>
        <main style={ style.content } >
          <Route exact path="/" component={Landing}/>
          <Route path="/about" component={About}/>
          <Route path="/todolist" component={TodoListBox}/>
        </main>
      < /div>
    );
  }
}

export default App;
