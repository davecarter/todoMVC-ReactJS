## TODOmvc ReactJS
### Step 06
- Persistencia de datos en *LocalStorage*

Ahora que la aplicación ya dispone de un *Array* de objetos, vamos a crear una funación que nos permita almacenar en *LocalStorage* el estado del ToDoList.

Cada vez que accedamos a la aplicación comprobaremos si existe este objeto y de ser así cargaremos su contenido. Además, lo actualizaremos cada vez que se modifique el estado de los *ToDos*.

```javascript
{
  "todos":[
    {
      "text":"Buy Milk",
      "id": 2016-10-24:18:06
      "done":false
    },
    {
      "text":"Buy Cookies",
      "id": 2016-10-24:18:26
      "done":false
    }
  ]
}
```
