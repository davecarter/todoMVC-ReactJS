import React, { Component } from 'react';
import Label from '../Label'

export default class Todo extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  };

  handleChange () {
    this.props.onDone(this.props.id);
  }

  handleRemove () {
    this.props.onRemoveTodo(this.props.id);
  }

  render(){
    const { id, done, text, onEditTodo } = this.props

    return (
      <div className="view">
        <input
          id={id}
          onChange={this.handleChange}
          checked={done}
          className="toggle"
          type="checkbox"/>
        <Label
          id={id}
          text={text}
          onEdit={onEditTodo}/>
        <button
          onClick={this.handleRemove}
          className="destroy">
        </button>
      </div>
    );
  }
}
