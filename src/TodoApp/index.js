import React, { Component } from 'react';
import TodoMaker from '../TodoMaker';
import TodoList from '../TodoList';
import TodoFooter from '../TodoFooter'

export default class TodoApp extends Component {
  constructor(props){
    super(props)
    this.addTodo = this.addTodo.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
    this.editTodo = this.editTodo.bind(this)
    this.changeFilter = this.changeFilter.bind(this)
    this.state = {
      todos: [],
      activeFilter: {
        'all': true,
        'active': false,
        'completed': false
      }
    }
  }

  componentDidMount(){
    let initialState = JSON.parse(localStorage.getItem('MyTodoAppState')) || {};
    this.setState(initialState);
  }

  updateState(newState){
    localStorage.setItem('MyTodoAppState', JSON.stringify(newState));
    this.setState(newState)
  }

  handleChange (id) {
    const newState = this.state.todos.map(todo => {
      if (todo.id == id){
        return {...todo, done: !todo.done}
      }

      return todo
    });

    this.updateState({
      todos: newState
    })
  }

  changeFilter (filter) {
    return (
      () => {
        const nextActiveFilters = Object.assign(
          {},
          {all: false, active: false, completed: false},
          {[filter]: !this.state.activeFilter[filter]}
        )
        this.setState({activeFilter: nextActiveFilters})
      }
    )
  }

  addTodo (todo) {
    let currentTodos = this.state.todos;
    currentTodos.push(todo);
    const newState = {todos: currentTodos}

    this.updateState(newState);
  }

  removeTodo (id) {
    const newState = this.state.todos.filter(todo => todo.id !== id)
    this.updateState({ todos: newState });
  }

  editTodo ({ id, text }) {
    const newState = this.state.todos.map( todo => {
      if(id !== todo.id){
        return todo
      } else {
        return { ...todo, text: text }
      }
    });

    this.updateState({ todos: newState });
  }

  render () {
    const itemsLeft = this.state.todos.filter(todo => !todo.done).length
    return (
      <div className="todoapp">
        <TodoMaker
          {...this.props}
          onAddTodo={this.addTodo} />
        <TodoList
          todos={this.state.todos}
          activeFilter={this.state.activeFilter}
          onDone={this.handleChange}
          onRemoveTodo={this.removeTodo}
          onEditTodo={this.editTodo} />
        <TodoFooter
          onChangeFilter={this.changeFilter}
          activeFilter={this.state.activeFilter}
          itemsLeft={itemsLeft} />
      </div>
    )
  }
}
