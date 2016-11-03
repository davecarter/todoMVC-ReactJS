## TODOmvc ReactJS
### Step 09
- Editar *ToDo*

La funcionalidad de *editar* la implementaremos haciendo doble click en el contenido del label de cada *ToDo*.
Si el usuario hace doble-click cambiaremos el elemento *label* por un *input* para que pueda introducir un contenido nuevo.

Para poder añadir esta funcionalidad convertiremos el elemento *label* actual a componente statefull de ReactJS, para que pueda almacenar el estado de *modo normal* o *modo edición*. En función de qué estado tenga el componente retornará un elemento *label* o un *input*.

```javascript
// El método Render del componente Todo pasará de ser así:

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
        // Actualment insertamos en el elemento label lo que recibe por la prop text
        <label>{this.props.text}</label>
        <button onClick={this.handleRemove} className="destroy"></button>
      </div>
    );
  }
```

Una vez convertido a componente le pasaremos las siguientes props: id, text y onEdit:
```javascript
render(){
    const { id, done, text, onEditTodo } = this.props
    return (
      <div className="view">
        <input id={id} onChange={this.handleChange.bind(this)} checked={done} className="toggle" type="checkbox"/>
        // Le pasamos las props id, text y onEditTodo directamente gracias al destructuring previo.
        <Label id={id} text={text} onEdit={onEditTodo}/>
        <button onClick={this.handleClick.bind(this)} className="destroy"></button>
      </div>
    );
  }
```

### Componente Label

Cuando el nuevo componente label tenga en su estado un objeto con el valor `{ editing: false }` retornará un elemento `<label></label>`. En caso contrario, si el valor es `true` retornará un `<input />` para que el usuario pueda introducir el nuevo contenido que ha de tener el *ToDo* que estamos editando. Para validar la edición pulsaremos *Enter* y cmbiaremos de nuevo el estado de *editing* a `false`.

```javascript
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
    this.props.onEdit(
      {
        text: e.target.value,
        id: id
      }
    )
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
```
