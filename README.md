## TODOmvc ReactJS
### Step 12

Para mejorar la calidad de nuestro código podemos usar uno de los muchos estándares de programación.
Nosotros vamos a utilizar [standard](https://github.com/feross/standard).

Instalamos los paquetes npm:
```
npm install standard --save-dev
npm install standard-react --save-dev
```

Añadimos el fichero del lint `.eslintrc`.

Cuando lo tengamos todo instalado y configurado, lo aplicaremos a nuestro código. Dependiendo del editor que estemos utilizando, podemos instalar plugins para ayudarnos.

En nuestro caso, estamos utilizando Atom con los siguientes plugins:
- linter
- linter-eslint
- standard-formatter

Aprovechamos también para mejorar nuestro código de React. Añadimos las 'propTypes':
```javascript
static get propTypes () {
  return {
    onDone: PropTypes.func,
    onRemoveTodo: PropTypes.func,
    onEditTodo: PropTypes.func,
    id: PropTypes.string,
    text: PropTypes.string,
    done: PropTypes.bool,
    lazyLoadSlider: PropTypes.bool
  }
}
```

Cambiamos los `bind` de los constructores por arrow functions:
```javascript
handleDoubleClick = () => {
  this.setState({
    editing: true
  })
}
```
