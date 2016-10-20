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

class TodoApp extends Component {
  constructor(props){
    super(props)
    this.logger = this.logger.bind(this)
  }

  logger (e) {
    console.log(e.target.value)
    e.target.value = ''
  }

  render () {
    return (
      <TodoMaker {...this.props} onLogger={this.logger}/>
    )
  }
}

ReactDOM.render(
  <TodoApp title='ToDo ReactJS'/>,
  document.getElementById('app')
);
