import React, { Component } from 'react';

export default class Label extends Component {
  constructor(...args){
    super(...args);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.state = {
      editing: false
    }
  }

  handleKeyPressed (id, e) {
    if (e.key == 'Enter') {
      this.props.onEdit({ text: e.target.value, id: id });
      e.target.value = '';
      this.setState({ editing: false });
    }
  }

  handleDoubleClick(){
    this.setState({
      editing: true
    })
  }

  handleChange (id, e) {
    this.props.onEdit({ text: e.target.value, id: id})
  }

  render(){
    const { id, text } = this.props

    return this.state.editing
      ? <input
          autoFocus
          className='new-todo'
          onKeyPress={this.handleKeyPressed.bind(this, id)}
          value={this.props.text}
          onChange={this.handleChange.bind(this, id)}/>
      : <label
          onDoubleClick={this.handleDoubleClick}>{this.props.text}</label>
  }
}
