import React from 'react';
import ReactDOM from 'react-dom';

const TodoMaker = (props) => {
  const logger = (e) => {
    console.log(e.target.value)
    e.target.value = ''
  }

  const onKeyPress = (e) => e.key === 'Enter' ? logger(e) : null

  return (
    <section className='todoapp'>
      <header className="header">
        <h1>{props.title}</h1>
        <input className='new-todo' onKeyPress={onKeyPress} placeholder={props.message} type={'text'}/>
      </header>
    </section>
  );
}

ReactDOM.render(
  <TodoMaker title='ToDo ReactJS'/>,
  document.getElementById('app')
);
