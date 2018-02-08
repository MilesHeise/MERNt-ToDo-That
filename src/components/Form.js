import React, { Component } from 'react';
import style from './style';

class Form extends Component {
  handleFocus(e) {
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
  }

  render() {
    return (
      <form onSubmit={ this.props.submit } style={ style.form } >
        <input type="text" value={ this.props.value } onChange={ this.props.change }
        style={ style.field } autoFocus onFocus={ this.handleFocus } />
        <input type="submit" value={ this.props.type } style={ style.smallButton } />
      </form>
    );
  }
}

export default Form;
