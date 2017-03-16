import React, { Component, PropTypes } from 'react'

export default class Label extends Component {
  static get propTypes () {
    return {
      onEdit: PropTypes.func,
      id: PropTypes.string,
      text: PropTypes.string,
      lazyLoadSlider: PropTypes.bool
    }
  }

  constructor (...args) {
    super(...args)
    this.state = {
      editing: false
    }
  }

  handleKeyPressed (id) {
    return (
      (e) => {
        if (e.key === 'Enter') {
          this.props.onEdit({ text: e.target.value, id: id })
          e.target.value = ''
          this.setState({ editing: false })
        }
      }
    )
  }

  handleDoubleClick = () => {
    this.setState({
      editing: true
    })
  }

  handleChange (id) {
    return (
      (e) => {
        this.props.onEdit({ text: e.target.value, id: id })
      }
    )
  }

  render () {
    const { id, text } = this.props

    return this.state.editing
      ? <input
        autoFocus
        className='new-todo'
        onKeyPress={this.handleKeyPressed(id)}
        value={text}
        onChange={this.handleChange(id)} />
      : <label
        onDoubleClick={this.handleDoubleClick}>{text}</label>
  }
}
