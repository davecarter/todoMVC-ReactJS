import React, { Component, PropTypes } from 'react'

export default class TodoFooter extends Component {
  static get propTypes () {
    return {
      itemsLeft: PropTypes.number,
      all: PropTypes.bool,
      active: PropTypes.bool,
      completed: PropTypes.bool,
      activeFilter: PropTypes.object,
      onChangeFilter: PropTypes.func
    }
  }

  render () {
    const { itemsLeft } = this.props
    const {all, active, completed} = this.props.activeFilter
    const classNameFilter = (filter) => filter ? 'selected' : ''
    return (
      <footer className='footer'>
        <span className='todo-count'>{itemsLeft} items left</span>
        <ul className='filters'>
          <li><a href='#' onClick={this.props.onChangeFilter('all')} className={classNameFilter(all)}>All</a></li>
          <li><a href='#' onClick={this.props.onChangeFilter('active')} className={classNameFilter(active)}>Active</a></li>
          <li><a href='#' onClick={this.props.onChangeFilter('completed')} className={classNameFilter(completed)} >Completed</a></li>
        </ul>
      </footer>
    )
  }
}
