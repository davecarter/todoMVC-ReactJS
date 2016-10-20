import React from 'react';
import ReactDOM from 'react-dom';

const TodoMaker = (props) => {
  return (
    <section className='todoapp'>
      <header className="header">
        <h1>{props.title}</h1>
        <input className='new-todo' placeholder={props.message} type={'text'}/>
      </header>
    </section>
  );
}

ReactDOM.render(
  <TodoMaker title='ToDo ReactJS'/>,
  document.getElementById('app')
);
