import React, { Component } from 'react';
// import style from './style';

class Form extends Component {
  render() {
    return (
      <form onSubmit={ this.props.submit }>
        <input type="text" value={ this.props.value } onChange={ this.props.change } />
        <input type="submit" />
      </form>
    );
  }
}

export default Form;
