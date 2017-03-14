## TODOmvc ReactJS
### Step 10
- Añadir filtros en *Footer*

La aplicación dispone de un *footer* en el que se muestran los items pendientes, los que están activos, completados, etc... En este *step* replicaremos estas funcionalidades. Crearemos un muevo componente llamado **TodoFooter** que retornará los elementos del DOM necesarios para mostrar esta información.

Crearemos un nuevo componente `TodoFooter`:
```
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
```
Añadiremos los filtros en el state del componente `TodoApp`:
```
this.state = {
  todos: [],
  activeFilter: {
    'all': true,
    'active': false,
    'completed': false
  }
}
```
En el mismo componente añadiremos el método `changeFilter`. Este método se encargará deponer los tres estados en `false` y posteriormente pasar a `true` el filtro selecionado.
```
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
```
Y filtraremos los resultados en el componente `TodoList`:
```
if ((todo.done === props.activeFilter.active) && (todo.done === !props.activeFilter.completed)) {
  return null
}
```
