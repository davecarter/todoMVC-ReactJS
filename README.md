## TODOmvc ReactJS

Versión didáctica del TODOmvc para iniciarse en ReactJS.

### Step 05
Llegados a este punto ya disponemos de un componente de orden superior llamado **TodoApp** que mantiene el estado de la aplicación, un componente **TodoMaker** que genera *ToDos* y otro llamado **Todo** que los muestra el resultado en pantalla. A continuación creamos un cuarto componente que nos permita mostrar un listado de *ToDos* llamado **TodoList**.

Necesitaremos que cada Elemento *Todo* que creamos disponga de un identificador único para que podamos posteriormente editarlo o eliminarlo. Por otro lado, el estado de nuestra aplicación pasará a ser un *Array* de objetos en el cual cada uno contendrá los datos necesarios para mostrar cada *ToDo*. Por ejemplo:

```javascript
{
  "todos":[
    {
      "text":"dasdsa",
      "id": 2016-10-24:18:06
      "done":false
    },
    {
      "text":"sadasd",
      "id": 2016-10-24:18:26
      "done":false
    }
  ]
}
```
