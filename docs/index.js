import React from 'react';
import ReactDOM from 'react-dom';


const TodoMaker = (props) => {
  const check = e => {
    if(e.key == 'Enter'){
      props.addTodo({text: e.target.value});
      e.target.value = '';
    }
  }

  return (
    <header className="header">
      <input
        onKeyPress={check}
        className="new-todo"
        type="text"
        placeholder={props.text}/>
    </header>
  );
}

class Todo extends React.Component {
  constructor(props){
    super();
    this.state = {
      done: props.done
    }
  };

  handleChange(){
    this.setState({
      done: !this.state.done
    })
  }

  handleClick(){
    this.props.removeTodo;
  }

  render(){
    return (
      <div className="view">
        <input id={this.props.id} onChange={this.handleChange.bind(this)} checked={this.state.done} className="toggle" type="checkbox" />
        <label>{this.props.text}</label>
        <button onClick={this.handleClick.bind(this)} className="destroy"></button>
      </div>
    );
  }
}

const TodoList = (props) => {
  const todos = props.todos.map((todo, index) => {
    return (
      <li key={index}>
        <Todo removeTodo id={todo.id} done={todo.done} text={todo.text} />
      </li>
    );
  });

  return (
    <section className="main">
    <ul className="todo-list">
      {todos}
    </ul>
  </section>
  );
}

const TodoFooter = (props) => {
  return (
    <footer className="footer">
      <span className="todo-count">3 items left</span>
      <ul className="filters">
        <li><a href="#" className="selected">all</a></li>
        <li><a href="#">active</a></li>
        <li><a href="#">completed</a></li>
      </ul>
    </footer>
  );
}

class TodoApp extends React.Component {
  constructor(){
    super();
    this.state = {
      todos : []
    }
  }

  static propTypes() {
    return (
      text: React.PropTypes.string
    )
  }

  addTodo(todo){
    var currentTodos = this.state.todos;
    currentTodos.push(todo);
    var newState = {todos: currentTodos}

    localStorage.setItem('MyTodoAppState', JSON.stringify(newState));
    this.setState(newState);
  }

  removeTodo(todo){
    var currentTodos = this.state.todos;
    currentTodos.splice(todo);
    var newState = {todos: currentTodos}

    localStorage.removeItem('MyTodoAppState', JSON.stringify(newState));
    this.setState(newState);
  }


  componentDidMount(){
    var initialState = JSON.parse(localStorage.getItem('MyTodoAppState'));
    this.setState(initialState);
  }

  render(){
    return (
      <div className="todoapp">
        <TodoMaker text={this.props.text} addTodo={this.addTodo.bind(this)}  />
        <TodoList todos={this.state.todos} removeTodo={this.removeTodo.bind(this)} />
        <TodoFooter />
      </div>
    );
  }
}

ReactDOM.render(
  <TodoApp text={"What\'s need to be done"}/>,
  document.getElementById('app')
);
