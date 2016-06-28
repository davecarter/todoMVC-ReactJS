import React from 'react';
import ReactDOM from 'react-dom';


const TodoMaker = (props) => {
  const check = e => {
    if(e.key == 'Enter'){
      props.onAddTodo({text: e.target.value, done: false});
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
    super(props);
  };

  handleClick(){
    this.props.onRemoveTodo(this.props.id);
  }

  handleChange(){
    this.props.onDone(this.props.text);
  }

  render(){

    return (
      <div className="view">
        <input id={this.props.id} onChange={this.handleChange.bind(this)} checked={this.props.done} className="toggle" type="checkbox" />
        <label>{this.props.text}</label>
        <button onClick={this.handleClick.bind(this)} className="destroy"></button>
      </div>
    );
  }
}

class TodoList extends React.Component {
  constructor(){
    super();
  }

  render(){

    const todos = this.props.todos.map((todo, index) => {
      return (
        <li key={index}>
          <Todo {...this.props} id={index} done={todo.done} text={todo.text} />
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
}

const TodoFooter = (props) => {
  return (
    <footer className="footer">
      <span className="todo-count">{props.itemsLeft} items left</span>
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

  handleChange(text){
    const newState = this.state.todos.map((todo) => {
        if(todo.text == text){
          return {...todo, done: !todo.done}
        }

        return todo
    });

    this.updateState({
      todos: newState
    })

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

  removeTodo(todoId){
    var currentTodos = this.state.todos;
    currentTodos.splice(todoId, 1);
    var newState = {todos: currentTodos}

    this.updateState(newState);
  }


  componentDidMount(){
    let initialState = JSON.parse(localStorage.getItem('MyTodoAppState'));
    if (!initialState) {
      initialState = {};
    };
    this.setState(initialState);
  }

  render(){
    const itemsLeft = this.state.todos.filter((todo) => {
      return !todo.done === true;
    }).length;

    return (
      <div className="todoapp">
        <TodoMaker text={this.props.text} onAddTodo={this.addTodo.bind(this)}  />
        <TodoList todos={this.state.todos} onDone={this.handleChange.bind(this)} onRemoveTodo={this.removeTodo.bind(this)} />
        <TodoFooter itemsLeft={itemsLeft}/>
      </div>
    );
  }
}

ReactDOM.render(
  <TodoApp text={"What\'s need to be done"}/>,
  document.getElementById('app')
);
