import React from 'react';
import serializeForm from 'form-serialize';
import fetch from 'isomorphic-fetch';

export default class SignUp extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      success: false,
      error: false
    };
  }
  onSubmit (e) {
    e.preventDefault();

    const {nombre, correo, edad, genero} = serializeForm(e.target, {hash: true});

    const query = `
      mutation {
        crearUsuario(nombre:"${nombre}", correo:"${correo}", edad:${edad}, genero:"${genero}")
      }
    `;

    fetch(`/graphql?query=${query.trim()}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre,
        correo,
        edad,
        genero
      })
    })
    .then((r) => {
      if (r.errors) throw new Error('Hubo un error');
      console.log('Éxito papus');
      this.setState({
        success: true,
        error: false
      });
    })
    .catch((r) => {
      console.error(r);
      this.setState({
        success: false,
        error: true
      });
    });
  }
  render () {
    return (
      <div>
        {(this.state.error) ? (<p>Hubo un error</p>) : null }
        {(this.state.success) ? (<p>Fue un éxito, papus :)</p>) : null }
        {(!this.state.error && !this.state.success || !this.state.success) ? (
          <form onSubmit={this.onSubmit.bind(this)}>
            <p>Ingresa tú información</p>
            <input type="text" name="nombre" placeholder="Tu nombre"/>
            <input type="email" name="correo" placeholder="mail@example.com"/>
            <input type="number" name="edad" placeholder="Tu edad"/>
            <input type="text" name="genero" placeholder="Tu genero"/>
            <button type="submit">Crear cuenta</button>
          </form>
        ) : null }
        {(this.state.success) ? (
          <form action="/logUser"method="post">
            <p>Ingresa tu correo electrónico para iniciar sesión</p>
            <input ref="mail" type="email" placeholder="mail@example.com" name="correo"/>
            <button type="submit" name="enviar">
              Inicia sesión
            </button>
          </form>
        ) : null}
      </div>
    );
  }
}
