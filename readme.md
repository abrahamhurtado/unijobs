# UniJOBS
Repositorio del proyecto de UniJOBS

## Corre la aplicación
- Primero
```
  git clone https://github.com/arhcstolen/unijobs.git
  npm install
```
- Tienes que tener instalado mongodb en tu computadora, cuando sea el caso, en terminal:
```
  mongod
```
- En otro proceso, inicializa la base de datos:
```
  npm run seed
```
- En modo development (hot reload)
```
  npm run dev
```

- En modo production (assets comprimidos, minificados, etc).
```
  npm run start
```
- Si estás en windows, el modo producción corre de la siguiente manera:
```
  npm run win
```

- Testea la aplicación
```
  npm run test
```

- Checar code quality
```
  npm run lint
```

## TODO:
- Hacer más tests (componentes de React, endpoints de GraphQL, etc).
- Añadir más queries y madres a GraphQL <-- EN PROGRESO
- Crear la base de datos <-- LISTO!
- Conectar el servidor (y GraphQL) con una base de datos (MongoDB) <-- LISTO!
- Crear rutas (a la REST) para abstraer los queries de GraphQL (no estoy seguro sobre esto)
- Conectar datos a los componentes de React.
- Implementar passwordless para registro de usuarios.
- Implementar lógica para sólo entrar a rutas estando autenticado.
- Agregar estilos (pa' que se vea kawaii).

## Usando la API

Tenemos los siguientes tipos de dato para buscar en GraphQL

``` js
type Usuarios {
  _id: Int,
  nombre: String,
  descripcion: String,
  intereses: [String],
  edad: Int,
  genero: String,
  correo: String,
  trabajos: [type Trabajos]
}

type Empresas {
  _id: Int,
  nombre: String,
  descripcion: String,
  intereses: [String],
  trabajosId: [{
    _id: Int
  }],
  trabajos: [type Trabajos]
}

type Trabajos {
  _id: Int,
  titulo: String,
  descripcion: String,
  intereses: [String],
  empresaId: {
    _id: Int
  },
  empresa: type Empresas
}
```

### Traer datos
NOTA: también pueden copiar la url entre comillas que está dentro de fetch, claro, tiene que estar corriendo el server

Vamos a traer el usuario con el id:0 y su nombre

``` js

  fetch('http://localhost:3000/graphql?query={usuario(id:0){nombre}}').then(r => r.json()).then(r => console.log(r));

```

Nosotros podemos decidir específicamente cuales son los datos que necesitamos, y sólo esos nos traerá

Por ejemplo, ahora quiero mucha más información del usuario con id:1

``` js
  fetch('http://localhost:3000/graphql?query={usuario(id:0){_id,nombre,descripcion,intereses,genero,edad,correo}}').then(r => r.json()).then(r => console.log(r));
```

Cuando un campo, corresponda a otro tipo, por ejemplo el campo Trabajos en Usuario, se le tiene que especificar qué información se necesita, por ejemplo:

``` js
  fetch('http://localhost:3000/graphql?query={usuario(id:0){_id,nombre,descripcion,intereses,genero,edad,correo, trabajos{_id,titulo,descripcion,intereses,empresaId{_id}}}}').then(r => r.json()).then(r => console.log(r));
```
Esto nos permite hacer consultas extremadamente locas y que, aún así, tengan sentido.

``` js

  fetch('http://localhost:3000/graphql?query={usuario(id:0){_id,nombre,descripcion,intereses,genero,edad,correo,%20trabajos{_id,titulo,descripcion,intereses,empresaId{_id},empresa{_id,nombre,intereses,trabajosId{_id},trabajos{_id,titulo,empresaId{_id},empresa{_id,nombre}}}}}}').then(r => r.json()).then(r => console.log(r));
```

#### NETA VOY A TENER QUE HACER TODAS ESAS PINCHES CONSULTAS? NO MAMES ABRAHAM, ESTÁS BIEN JODIDO.

Nop, no habrá que hacerlas, sólo es para que vean como funciona y lo prueben :P pero es un WIP

### Creación de datos
Son unos ejemplos para que vean como funcionan, para ver las entrañas y saber más que onda, chequen los archivos en la carpeta server/api, self-documented el pedo.

- crearUsuario
  - argumentos:
    - nombre: String,
    - edad: Int,
    - correo: String,
    - genero: String,

```js
fetch('http://localhost:3000/graphql?query=mutation{crearUsuario(nombre:"Abraham", correo:"yo@correo.com", edad:20, genero:"hombre")}', {method:"POST"}).then(r => r.json()).then(r => console.log(r))
```

- actualizarUsuario
  - argumentos:
    - id: Int (el usuario que vamos a actualizar)
    - nombre: String,
    - descripcion: String,
    - intereses: [String]
  - Regresa la versión anterior del usuario, hay que agregar subcampos

```js
fetch('http://localhost:3000/graphql?query=mutation{actualizarUsuario(id:2, nombre: "Saúl", descripcion:"Un tío demasiado guay", intereses:["programación","javascript","react","php","java"]){_id, nombre,descripcion,genero,edad,intereses}}', {method:"POST"}).then(r => r.json()).then(r => console.log(r))
```

- borrarUsuario
  - argumentos:
    - id: Int (el usuario que vamos a borrar)

```js
fetch('http://localhost:3000/graphql?query=mutation{borrarUsuario(id:2)}', {method: 'POST'}).then(r => r.json()).then(r => console.log(r));
```

También se puede hacer todo esto con los trabajos y empresas, peeeero, hay un caso especial

- crearTrabajo
  - argumentos:
    - id: Int (ESTE ID ES EL DE LA EMPRESA QUE OFRECE ESTE EMPLEO)
    - titulo: String
    - descripcion: String
    - intereses: [String]

```js
fetch('http://localhost:3000/graphql?query=mutation{crearTrabajo(id:0,titulo:"Programador en Ruby",descripcion:"Pos que sepa usar Ruby on Rails",intereses:["programación","it","ruby","ruby on rails"])}', {method: 'POST'}).then(r => r.json()).then(r => console.log(r));
```

## Links interesantes

[Como usar Clases con ES6 y React](https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4)

[React: Container Components](https://medium.com/@learnreact/container-components-c0e67432e005#.8684ovp2n)

[GraphQL.org](http://graphql.org/)

[React: Testing](https://medium.com/@MarcFly1103/react-to-changes-with-pure-components-caa761836e9f#.s8mzea356)

[React Router](https://github.com/rackt/react-router)

[Testing con Tape](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4)

[Teoría de Higher Order Functions/Components](https://blog.risingstack.com/functional-ui-and-components-as-higher-order-functions/)

[Aswesome GraphQL](https://github.com/chentsulin/awesome-graphql)

[Aprende ES6 a fondo](https://ponyfoo.com/articles/tagged/es6-in-depth)

[Awesome React](https://github.com/enaqx/awesome-react)

[La cagué en un commit, ¿cómo lo arreglo?](http://stackoverflow.com/questions/927358/how-do-you-undo-the-last-commit)

[Lint like it's 2015](https://medium.com/@dan_abramov/lint-like-it-s-2015-6987d44c5b48)

[Egghead.io](https://egghead.io/)

[Creando una app robusta con React](http://maketea.co.uk/2014/03/05/building-robust-web-apps-with-react-part-1.html)

[Smart and Dumb Components (vean el link de Container Components también)](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#3f35)

[Higher Order Components](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)

## Contribuciones

1. Hazle fork a este repo.
2. Clona el fork.
3. Añade como remoto este repo para estar bajando las nuevas actualizaciones.
4. Se recomienda hacer cambios y experimentos en otras ramas y luego fusionar con master.
5. Constantemente baja los cambios del repo original y fusionalos con el master de tu fork (!importante).
6. Fusiona tus ramas experimentales con tu master.
7. Sube los cambios al fork y de ahí haz un pull request describiendo todos los cambios.
8. Posiblemente haya que reordenar mejor los archivos y (nombres y locaciones).
9. Si hay problemas, abrir un issue en el repo original y detallarlo.

**Protip:** hagan ```git rebase``` para fusionar los cambios, es mejor que ```git merge```

**Protip 2:** si pueden incluir tests, mejor!

## Si hay dudas, ya saben: @arhcstolen, arhc.hc@gmail.com y ya se saben mi Facebook :)
