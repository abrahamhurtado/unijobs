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
