import React, { PropTypes } from 'react'
import cx from 'classnames'
import Todo from '../Todo'

const TodoList = (props) => {
  let todos = props.todos.filter(todo => ((todo.done === !props.activeFilter.active) || (todo.done === props.activeFilter.completed)))

  todos = todos.map((todo, index) => {
    if ((todo.done === props.activeFilter.active) && (todo.done === !props.activeFilter.completed)) {
      return null
    }
    const completed = cx({ 'completed': todo.done })
    return (
      <li key={index} className={completed}>
        <Todo {...props} {...todo} />
      </li>
    )
  })

  return (
    <ul className='todo-list'>
      {todos}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array,
  activeFilter: PropTypes.object
}

export default TodoList
