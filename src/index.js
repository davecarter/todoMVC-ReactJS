import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

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

class Label extends Component {
  constructor(...args){
    super(...args);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.state = {
      editing: false
    }
  }

  handleKeyPressed (id, e) {
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

  handleChange (id, e) {
    this.props.onEdit({ text: e.target.value, id: id})
  }

  render(){
    const { id, text } = this.props

    return this.state.editing
      ? <input
          autoFocus
          className='new-todo'
          onKeyPress={this.handleKeyPressed.bind(this, id)}
          value={this.props.text}
          onChange={this.handleChange.bind(this, id)}/>
      : <label
          onDoubleClick={this.handleDoubleClick}>{this.props.text}</label>
  }
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
        <Label id={id} text={text} onEdit={onEditTodo}/>
        <button onClick={this.handleRemove} className="destroy"></button>
      </div>
    );
  }
}

const TodoList = (props) => {
  let todos = props.todos.filter(todo => ((todo.done === !props.activeFilter.active) || (todo.done === props.activeFilter.completed)))

  todos = todos.map((todo, index) => {
    if ((todo.done === props.activeFilter.active) && (todo.done === !props.activeFilter.completed)) {
      return null
    }
    const completed = cx({'completed': todo.done })
    return (
      <li key={index} className={completed}>
        <Todo {...props}
          id={todo.id}
          done={todo.done}
          text={todo.text}
          onRemoveTodo={props.onRemoveTodo}
          onEditTodo={props.onEditTodo} />
      </li>
    );
  });
  
  return (
    <ul className="todo-list">
      {todos}
    </ul>
  )
}

class TodoFooter extends Component {
  constructor(props){
    super(props)
  }

  render (){
    const { itemsLeft } = this.props;
    const {all, active, completed} = this.props.activeFilter
    const classNameFilter = (filter) => filter ? 'selected' : ''
    return(
      <footer className='footer'>
      <span className='todo-count'>{itemsLeft} items left</span>
        <ul className='filters'>
          <li><a href='#' onClick={this.props.onChangeFilter('all')} className={classNameFilter(all)}>All</a></li>
          <li><a href='#' onClick={this.props.onChangeFilter('active')} className={classNameFilter(active)}>Active</a></li>
          <li><a href='#' onClick={this.props.onChangeFilter('completed')} className={classNameFilter(completed)} >Completed</a></li>
        </ul>
      </footer>
    )
  }
}

class TodoApp extends Component {
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
    var currentTodos = this.state.todos;
    currentTodos.push(todo);
    var newState = {todos: currentTodos}

    this.updateState(newState);
  }

  removeTodo (id) {
    var newState = this.state.todos.filter(todo => todo.id !== id)
    this.updateState({ todos: newState });
  }

  editTodo ({ id, text }) {
    var newState = this.state.todos.map( todo => {
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
        <TodoMaker {...this.props} onAddTodo={this.addTodo} />
        <TodoList
          todos={this.state.todos}
          activeFilter={this.state.activeFilter}
          onDone={this.handleChange}
          onRemoveTodo={this.removeTodo}
          onEditTodo={this.editTodo} />
        <TodoFooter onChangeFilter={this.changeFilter} activeFilter={this.state.activeFilter} itemsLeft={itemsLeft} />
      </div>
    )
  }
}

ReactDOM.render(
  <TodoApp title='ToDo ReactJS' message='What needs to be done'/>,
  document.getElementById('app')
);
