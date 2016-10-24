import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const TodoMaker = (props) => {
  const onKeyPress = (e) => {
    if(e.key === 'Enter'){
      props.onAddTodo({text: e.target.value, done: false})
      e.target.value = ''
    }
  }

  return (
    <section className='todoapp'>
      <header className="header">
        <h1>{props.title}</h1>
        <input className='new-todo' onKeyPress={onKeyPress} placeholder={props.message} type='text' />
      </header>
    </section>
  );
}

const Todo = (props) => {
  return (
    <div className="view">
      <input className="toggle" type="checkbox"/>
      <label>{props.text}</label>
      <button className="destroy"></button>
    </div>
  )
}

class TodoApp extends Component {
  constructor(props){
    super(props)
    this.addTodo = this.addTodo.bind(this)
    this.state = {
      todos : []
    }
  }

  updateState(newState){
    localStorage.setItem('MyTodoAppState', JSON.stringify(newState));
    this.setState(newState)
  }

  addTodo (todo) {
    var currentTodos = this.state.todos;
    currentTodos.push(todo);
    var newState = {todos: currentTodos}
    this.updateState(newState);
    console.log(currentTodos.text)
  }

  render () {
    return (
      <div className="todoapp">
        <TodoMaker {...this.props} onAddTodo={this.addTodo}/>
      </div>
    )
  }
}

ReactDOM.render(
  <TodoApp title='ToDo ReactJS' message='What needs to be done? '/>,
  document.getElementById('app')
);
