import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const TodoMaker = (props) => {
  const onKeyPress = e => {
    if(e.key == 'Enter'){
      props.onAddTodo({text: e.target.value, done: false});
      e.target.value = '';
    }
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

const TodoList = (props) => {
  const todos = props.todos.map((todo, index) => {
    return (
      <li key={index}>
        <Todo {...props} id={index} done={todo.done} text={todo.text} />
      </li>
    );
  });

  return (
    <ul className="todo-list">
      {todos}
    </ul>
  )
}

class TodoApp extends Component {
  constructor(props){
    super(props)
    this.addTodo = this.addTodo.bind(this)
    this.state = {
      todos: []
    }
  }

  componentDidMount(){
    let initialState = JSON.parse(localStorage.getItem('MyTodoAppState'));
    if (!initialState) {
      initialState = {};
    };
    this.setState(initialState);
  }

  updateState(newState){
    localStorage.setItem('MyTodoAppState', JSON.stringify(newState));
    this.setState(newState)
  }

  addTodo(todo){
    var currentTodos = this.state.todos;
    currentTodos.push(todo);
    var newState = {todos: currentTodos}

    this.updateState(newState);
  }

  render () {
    return (
      <div className="todoapp">
        <TodoMaker {...this.props} onAddTodo={this.addTodo}/>
        <TodoList todos={this.state.todos} />
      </div>
    )
  }
}

ReactDOM.render(
  <TodoApp title='ToDo ReactJS' message='What needs to be done'/>,
  document.getElementById('app')
);
