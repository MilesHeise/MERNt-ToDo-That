import React, { Component } from 'react';
import axios from 'axios';
import Todo from './Todo';
import Form from './Form';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
      editedTodoDescription: ''
    };
    this.handleBlur = this.handleBlur.bind(this);
  }

  openEditField(id, desc) {
    this.setState({ editing: id, editedTodoDescription: desc });
  }

  handleChange(e) {
     this.setState({ editedTodoDescription: e.target.value })
   }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.editedTodoDescription) { return }
    const editedTodo = { description: this.state.editedTodoDescription };
    axios.put(`http://localhost:3001/api/todos/${this.state.editing}`, editedTodo)
      .then(res => {
        this.props.passUpdate(this.state.editing, this.state.editedTodoDescription);
        this.setState({ editing: null, editedTodoDescription: '' });
      })
      .catch(err => {
        console.error(err);
      })
  }

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

  handleBlur(e) {
    this.setState({ editing: null} );
  }

  renderItemOrEdit(todo) {
    if (this.state.editing === todo._id) {
      return <Form
        key={ todo._id }
        submit={ (e) => this.handleSubmit(e) }
        value={ this.state.editedTodoDescription }
        change={ (e) => this.handleChange(e) }
        type='Edit'
        />;
    } else {
      return <Todo
        key={ todo._id }
        description={ todo.description }
        completed={ todo.completed }
        onDelete={ (id) => this.delete(todo._id) }
        onToggle={ (id) => this.toggle(todo._id) }
        editText={ (id, desc) => this.openEditField(todo._id, todo.description) }
        />;
    }
  }

  render() {
    const todoList = this.selectView(this.props.show);

    return (
      <ul onMouseLeave={ this.handleBlur } >
        { todoList.map( (todo) =>
          this.renderItemOrEdit(todo)
        )}
      </ul>
    );
  }
}

export default List;
