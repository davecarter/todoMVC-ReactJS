## TODOmvc ReactJS
### Step 06
- Persistencia de datos en *LocalStorage*

Ahora que la aplicación ya dispone de un *Array* de objetos, vamos a crear una funación que nos permita almacenar en *LocalStorage* el estado del ToDoList.

Cada vez que accedamos a la aplicación comprobaremos si existe este objeto y de ser así cargaremos su contenido. Además, lo actualizaremos cada vez que se modifique el estado de los *ToDos*.

En este paso introducimos el método [**ComponentDidMount**](https://facebook.github.io/react/docs/react-component.html#componentdidmount) de ReactJS en el cual inicializamos el estado del componente en el momento que está disponible en el DOM.

**Local Storage:**
```javascript
MyTodoAppState : {
  "todos":[
    {"text":"Buy Milk","done":false},
    {"text":"Buy Cookies","done":false}
  ]
}
```
