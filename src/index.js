import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const TodoMaker = (props) => {
  const onKeyPress = e => {
    if(e.key == 'Enter'){
      props.onAddTodo({text: e.target.value, done: false, id: new Date().toISOString()});
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

class Todo extends Component {
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
        <label>{this.props.text}</label>
        <button onClick={this.handleRemove} className="destroy"></button>
      </div>
    );
  }
}

const TodoList = (props) => {
  const todos = props.todos.map((todo, index) => {
    return (
      <li key={index}>
        <Todo {...props}
          id={todo.id}
          done={todo.done}
          text={todo.text}
          onRemoveTodo={props.onRemoveTodo} />
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
    this.handleChange = this.handleChange.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
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

  addTodo (todo) {
    var currentTodos = this.state.todos;
    currentTodos.push(todo);
    var newState = {todos: currentTodos}

    this.updateState(newState);
  }

  removeTodo (id) {
    console.log('REMOVED', id)
  }

  render () {
    return (
      <div className="todoapp">
        <TodoMaker {...this.props} onAddTodo={this.addTodo}/>
        <TodoList
          todos={this.state.todos}
          onDone={this.handleChange}
          onRemoveTodo={this.removeTodo} />
      </div>
    )
  }
}

ReactDOM.render(
  <TodoApp title='ToDo ReactJS' message='What needs to be done'/>,
  document.getElementById('app')
);
