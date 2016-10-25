## TODOmvc ReactJS
### Step 07
- Marcar *ToDo* como **hecho** (Done)

El componente *Todo* contiene un elemento de formulario `<input />`. Vamos a utilizar el atributo booleano *checked* para emitir los cambios que realice el usuario hasta el estado de la aplicación.

Para poder crear métodos que nos permitan gestionar estos cambios, refactorizaremos el componente *Todo* de *stateless* a *statefull*.

Además, añadimos una nueva clave *time stamp* en el objeto que define cada *ToDo* para utilizarlo como identificador. De esta forma, aunque el contenido de texto del Todo sea exactamente igual a otro podremos identificar cada *ToDo* individualmente.

**Versión Statefull del componente Todo:**
```javascript
class Todo extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this)
  };

  handleChange () {
    this.props.onDone(this.props.id);
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
        <button className="destroy"></button>
      </div>
    );
  }
}
```

Para gestionar el cambio de estado en la aplicación, creamos un método llamado `handleChange` en el componente *TodoApp*. Recibe como parámetro el identificador del *ToDo* que queremos marcar como *Done* y le invierte el valor booleano de la clave `done` (true => false o de false => true).
Una vez cambiado dicho valor pasamos el nuevo array de objetos al método `updateState` que se encarga de actualizar el estado de la aplicación en *localStorage*:

```javascript
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
```
