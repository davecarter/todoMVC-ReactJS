import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const TodoMaker = (props) => {
  const onKeyPress = (e) => {
    e.key === 'Enter' ? props.onLogger(e) : null
  }

  return (
    <section className='todoapp'>
      <header className="header">
        <h1>{props.title}</h1>
        <input className='new-todo' onKeyPress={onKeyPress} placeholder={props.message} type={'text'}/>
      </header>
    </section>
  );
}

const Todo = (props) => {
  return (
    <ul className="todo-list">
      <li>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>{props.text}</label>
          <button className="destroy"></button>
        </div>
      </li>
    </ul>
  )
}

class TodoApp extends Component {
  constructor(props){
    super(props)
    this.logger = this.logger.bind(this)
    this.state = {
      text: ''
    }
  }

  logger (e) {
    console.log(e.target.value)
    this.setState({text: e.target.value})
    e.target.value = ''
  }

  render () {
    return (
      <div className="todoapp">
        <TodoMaker {...this.props} onLogger={this.logger}/>
        <Todo text={this.state.text} />
      </div>
    )
  }
}

ReactDOM.render(
  <TodoApp title='ToDo ReactJS' message='What needs to be done'/>,
  document.getElementById('app')
);
