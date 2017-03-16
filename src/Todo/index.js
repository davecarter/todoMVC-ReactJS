import React, { Component, PropTypes } from 'react'
import Label from '../Label'

export default class Todo extends Component {
  static get propTypes () {
    return {
      onDone: PropTypes.func,
      onRemoveTodo: PropTypes.func,
      onEditTodo: PropTypes.func,
      id: PropTypes.string,
      text: PropTypes.string,
      done: PropTypes.bool,
      lazyLoadSlider: PropTypes.bool
    }
  }

  handleChange = () => {
    this.props.onDone(this.props.id)
  }

  handleRemove = () => {
    this.props.onRemoveTodo(this.props.id)
  }

  render () {
    const { id, done, text, onEditTodo } = this.props

    return (
      <div className='view'>
        <input
          id={id}
          onChange={this.handleChange}
          checked={done}
          className='toggle'
          type='checkbox' />
        <Label
          id={id}
          text={text}
          onEdit={onEditTodo} />
        <button
          onClick={this.handleRemove}
          className='destroy' />
      </div>
    )
  }
}
