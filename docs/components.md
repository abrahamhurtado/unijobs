# React

React es una librería hecha por Facebook para crear interfaces de usuario. React sigue la filosofía de que cada parte de nuestra aplicación es un componente. El chiste es poder juntar todos esos componentes para lograr nuestra app.

Los componentes que definamos deben tener un método render, que regrese aquellos elementos que queremos desplegar en nuestra UI.

Esos elementos los definimos utilizando JSX, una sintaxis que es como XML/HTML y que se compila com Babel, para generar nodos de DOM y VDOM. De igual manera, para poder usar nuestros componentes los llamamos usando la sintaxis de JSX.

Para montar nuestros Componentes usamos el paquete ReactDOM y su método render, que recibe como argumentos el componente que queremos renderizar y el nodo de DOM donde se posicionará, en el caso de UniJOBS, podemos ver que en ```./web/frontend/main.js``` se utiliza de la siguiente manera:

```js
// montando un componente en el DOM.
ReactDOM.render(Component, document.getElementById('react-app'));
```

# [DOCUMENTACIÓN DE REACT](http://facebook.github.io/react/)

## Cómo crear componentes en React

### ES6 Classes

```js
import React from 'react';

export default class MyComponent extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return <Something in JSX/>
  }
}
```

Es necesario que React este en el scope de la definición de nuestro componente, porque las lo que escribimos en JSX se compila a ```React.createElement(...)```

__También, dentro de render no podemos regresar más un nodo de DOM, esto quiere decir que lo siguiente es inválido__:

```
render () {
  return (
    <p>Hola</p>
    <p>Mundo</p>
  );
}
```

Si quieres regresar más de un nodo, es mejor agruparlo dentro de un div.

```
render () {
  return (
    <div>
      <p>Hola</p>
      <p>Mundo</p>
    </div>
  );
}
```

Ventajas de ES6 Classes:

  - Funciona el Hot Reloading.
  - [Lifecycle methods](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods).

### Stateless components

```js
import React from 'react';

export default (props) => <Something in JSX/>
```

Ventajas de usar Stateless Components:
  - Sintaxis y código más limpio.
  - Son componentes _puros_ porque no manejan _state_.

## ¿Cuándo usar ES6 Classes o Stateless Components?

Si vas a manejar _state_ (no recomendado) o Lifecycle methods => ES6 Classes

Si vas a crear un cómponente sólo para renderizar (y todo lo que necesitas, lo obtienes vía props), o no necesitas los Lifecycle methods => Stateless Components

Posiblemente, primero tengamos que escribir todos los componentes en clases para que funcione el Hot Reload y transformarlos en runtime como stateless componentes con un plugin de Babel, eso en lo que añaden soporte para este tipo de componentes en React Transform HMR.˚

###### Ejemplos
```js
import React from 'react';
import ReactDOM from 'react-dom';

// en ES6 Classes
class HolaMundo extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    const {nombre} = this.props; // destructuring
    return <h1>{`Hola, ${nombre}!`}<h1/> // esto es JSX. Se puede utilizar lógica de JavaScript escribiendo tu código entre llaves {}.
  }
}

// como stateless Components
let HolaMundo = (props) => <h1>{`Hola, ${props.nombre}`}</h1>

ReactDOM.render(<HolaMundo nombre="Abraham" />, DOMnode); // aquí nombre es una prop.
```

[Pruébalo en JSBin (versión 0.13.0 de React)](http://jsbin.com/fumiqiqisu/edit?html,js,output)

## ¿Qué son props y state?

Una de las responsabilidades de un componente es transformar información en HTML, los props y el state constituyen la información de la que deriva el HTML que desplegará el componente.

- Ambos (_props_ y _state_) son objetos de JavaScript.
- Cuando sucede un cambio en ambos, se ocasiona una actualización del componente.

__props__ (versión corta de _properties_) se pueden definir como la configuración u opciones de un componente. Se pueden pasar de componentes padres a hijos.

__state__ inicia con un valor por efecto cuando el componente se renderiza por primera vez y sufre mutaciones (principalmente generadas por acciones del usuario). Podemos verlo como una representación del componente en el tiempo. Cada componente maneja su propio __state__ y si quiere pasarlo a un componente hijo, debe hacerlo vía __props__

###### Ejemplo de state
```js
import React from 'react';
import ReactDOM from 'react-dom';

class HolaMundo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  updateCount () {
    this.setState({
      count: this.state.count + 1
    });
  }
  resetCount () {
    this.setState({
      count: 0
    });
  }
  render () {
    const {nombre} = this.props;
    return (
      <div>
        <p>{`Hola, ${nombre}`}</p>
        <p onClick={this.updateCount.bind(this)}>Click me!</p>
        <p>Count: {`${this.state.count}`}</p>
        <p onClick={this.resetCount.bind(this)}>Reset count</p>
      </div>
    )
  }
}

ReactDOM.render(<HolaMundo nombre="Abraham" />, DOMnode);
```

[Pruébalo en JSBin](http://jsbin.com/vozovetopa/edit?html,js,output)

La mejor práctica, sería evitar usar __state__ a menos que sea necesario, pues nuestros componentes se volverán impredecibles, dejando de ser puros. Lo mejor es nuestros datos almacenarlos en props e irlos pasando de componente a componente.

###### Pasar props entre componentes

```js
import React from 'react';
import ReactDOM from 'react-dom';

class HolaMundo extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return <MuestraNombre {...this.props} />; // de esta manera estás pasando todos los props de HolaMundo a MuestraNombre
  }
}

class MuestraNombre extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    const {nombre} = this.props;
    return <h1>{`Hola, ${nombre}!`}</h1>
  }
}

ReactDOM.render(<HolaMundo nombre="Abraham" />, DOMnode);
```

[Pruébalo en JSBin](http://jsbin.com/zomalamuvu/1/edit?html,js,output)
