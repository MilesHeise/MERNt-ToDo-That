import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Todo from './components/Todo';
import About from './components/About';

class App extends Component {
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
        <main>
          <Route exact="exact" path="/" component={Todo}/>
          <Route path="/about" component={About}/>
        </main>
      < /div>
    );
  }
}

export default App;
