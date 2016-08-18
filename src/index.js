import React from 'react';
import ReactDOM from 'react-dom';


const TodoMaker = (props) => {
  const check = e => {
    if(e.key == 'Enter'){
      props.onAddTodo({text: e.target.value, done: false, id: new Date().toISOString() });
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

class Label extends React.Component {
  props: {
    text: string,
    onEdit: any
  };

  constructor(){
    super();
    this.state = {
      editing: false
    }
  }

  handleKeyPressed(id, e){
    console.log("pressed", id);
    if (e.key == 'Enter') {
      this.props.onEdit({ text: e.target.value, id: id });
      e.target.value = '';
      this.setState({ editing: false });
    }
  }

  handleDoubleClick(){
    this.setState({
      editing: true
    })
  }

  render(){
    const { id, text } = this.props

    return this.state.editing
      ? <input
          autoFocus
          className='new-todo'
          placeholder={text}
          onKeyPress={this.handleKeyPressed.bind(this, id)}/>
      : <label
          onDoubleClick={this.handleDoubleClick.bind(this)}>{this.props.text}</label>
  }
}

class Todo extends React.Component {
  constructor(props){
    super(props);
  };

  handleClick () {
    this.props.onRemoveTodo(this.props.id);
  }

  handleChange () {
    this.props.onDone(this.props.id);
  }

  render(){
    const { id, done, text, onEditTodo } = this.props
    return (
      <div className="view">
        <input id={id} onChange={this.handleChange.bind(this)} checked={done} className="toggle" type="checkbox"/>
        <Label id={id} text={text} onEdit={onEditTodo}/>
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
    const todos = this.props.todos.map(todo => {
      return (
        <li key={todo.id}>
          <Todo
            id={todo.id}
            onDone={this.props.onDone}
            onAddTodo={this.props.onAddTodo}
            onRemoveTodo={this.props.onRemoveTodo}
            onEditTodo={this.props.onEditTodo}
            done={todo.done}
            text={todo.text} />
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

  handleChange (id) {
    console.log('id', id)
    const newState = this.state.todos.map(todo => {
      console.log(todo.id)
      console.log(todo.id === id)
      if (todo.id == id){
        console.log('inside', id)
        return {...todo, done: !todo.done}
      }

      return todo
    });

    this.updateState({
      todos: newState
    })
  }

  updateState (newState) {
    localStorage.setItem('MyTodoAppState', JSON.stringify(newState));
    this.setState(newState)
  }

  addTodo (todo) {
    var newState = [...this.state.todos, todo]
    this.updateState({ todos: newState });
  }

  editTodo ({ id, text }) {
    console.log("editing", this.state.todos);
    var newState = this.state.todos.map( todo => {
      if(id !== todo.id){
        return todo
      } else {
        return { ...todo, text: text }
      }
    });

    this.updateState({ todos: newState });
  }

  removeTodo (id) {
    var newState = this.state.todos.filter(todo => todo.id !== id)
    this.updateState({ todos: newState });
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
        <TodoMaker
          text={this.props.text}
          onAddTodo={this.addTodo.bind(this)}  />
        <TodoList
          todos={this.state.todos}
          onDone={this.handleChange.bind(this)}
          onRemoveTodo={this.removeTodo.bind(this)}
          onEditTodo={this.editTodo.bind(this)} />
        <TodoFooter itemsLeft={itemsLeft}/>
      </div>
    );
  }
}

ReactDOM.render(
  <TodoApp text={"What\'s need to be done"}/>,
  document.getElementById('app')
);
