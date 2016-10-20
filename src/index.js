import React from 'react';
import ReactDOM from 'react-dom';

const Helloworld = (props) => {
  return (
    <section className='todoapp'>
      <header className="header">
        <h1>{props.title}</h1>
      </header>
    </section>
  );
}

ReactDOM.render(
  <Helloworld title='Hello World from props!'/>,
  document.getElementById('app')
);
