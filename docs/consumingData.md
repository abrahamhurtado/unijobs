# Como consumir la API en nuestros componentes

Digamos que queremos que el componente despliegue información sobre los trabajos, lo que haremos con nuestro componente es:

```js
import React from 'react';
import { resolve } from 'react-resolver';
import fetch from 'isomorphic-fetch';

// si quieres que el query sea mucho más legible
let query = `{
  trabajos {
    _id,
    titulo
  }
}`

// usamos como ejemplo un stateless component porque sólo vamos a desplegar datos, no es necesaria una clase.
let MiComponente = (props) => {
  const {trabajos} = props.payload.data;

  return (
    <ul>
      { trabajos.map(
        (trabajo) => <li key={ trabajo['_id'] }>{trabajo.titulo}</li>
      ) }
    </ul>
  );
};

export default resolve('payload', function (props) {
  return fetch(`/graphql?query=${query.trim()}`).then(r => r.json())
})(MiComponente);

```

Si quisiéramos escribir nuevos datos, podemos hacer esto:

```js

import React from 'react';
import fetch from 'isomorphic-fetch';

let MiComponente = (props) => {

  let actualizarDatos = () => {
    // aquí habría que implementar una lógica para obtener los datos
    let query = `
      mutation {
        actualizarUsuario(id: 2, nombre: "Saúl", descripcion: "Un tío demasiado guay", intereses: ["programación", "javascript", "react"]) {
          _id,
          nombre,
          descripcion,
          genero,
          edad,
          intereses
        }
      }
    `;

    fetch(`/graphql?query=${query.trim()}`, {method: 'POST'}).then(r => r.json());
  }

  return (
    <p onClick={actualizarDatos}>Clic para actualizar datos</p>
  )

}
```
