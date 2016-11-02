## TODOmvc ReactJS
### Step 08
- Borrar *ToDo*

Utilizamos la clave *id* que contiene un *time stamp* único para cada objeto que define un *ToDo* para eliminarlo del array de objetos que conforman el estado de la aplicación. Además añadimos una clase que *tacha* el contenido del *ToDo* cuando lo marcamos como *done*.

Pasaremos por *props* una función desde el componente de orden superior **TodoApp** hasta el componente **Todo**.


### Tachar *ToDo*

Para cambiar el aspecto del *ToDo* que marcamos como *Done* utilizaremos `classnames`. Previamente la instalaremos como dependencia mediante: `npm i classnames -S`.

[Classnames](https://www.npmjs.com/package/classnames) es una aplicación que nos permite añadir o quitar clases en base a lo que evalue un valor booleano. En este caso haremos:

```javascript
// Importamos classnames como cx:
import cx from 'classnames';

// Guardamos en la variable completed la cadena 'completed' sólo cuando la prop 'todo.done' evalue 'true':
const completed = cx({'completed': todo.done })
```

Para aplicarla utilizaremos:
```HTML
<li key={index} className={completed}>
```
Recordad que no podemos utilizar la palabla `class` ya que es una keyword de JavaScript. Por eso se usa `className`.

El motivo de usar la clase `completed` es unicamente para no tener que modificar los selectores CSS originales de la aplicación [todomvc.com](todomvc.com/examples/react/#/).
