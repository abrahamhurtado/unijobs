import React from 'react';
import serializeForm from 'form-serialize';
import fetch from 'isomorphic-fetch';

export default class SignUpUsers extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      success: false,
      error: false,
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
    .then((r) => r.json())
    .then((r) => {
      if (r.errors) throw new Error(r.errors[0].message);
      this.setState({
        success: true,
        error: false
      });
    })
    .catch((r) => {
      this.setState({
        success: false,
        error: true,
        message: String(r)
      });
    });
  }
  login (e) {
    e.preventDefault();
    const {correo} = serializeForm(e.target, {hash: true});

    fetch('/logUser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correo
      })
    })
    .then((r) => r.json())
    .then(({mensaje}) => {
      this.setState({
        mensaje
      });
    })
    .catch(({mensaje}) => {
      this.setState({
        mensaje
      });
    });
  }
  render () {
    return (
      <div>
        {(this.state.error && this.state.message) ? (<p>{this.state.message}</p>) : null }
        {(this.state.success) ? (<p>Fue un éxito, papus :)</p>) : null }
        {(!this.state.error && !this.state.success || !this.state.success) ? (
          <form onSubmit={this.onSubmit.bind(this)}>
            <p>Ingresa tú información</p>
            <input type="text" name="nombre" placeholder="Tu nombre"/>
            <input type="email" name="correo" placeholder="mail@example.com"/>
            <input type="number" name="edad" placeholder="Tu edad"/>
            <input type="text" name="genero" placeholder="Tu genero"/>
            <button type="submit">Inicia sesión</button>
          </form>
        ) : null }
        {(this.state.success) ? (
          <form action="/logUser" onSubmit={this.login.bind(this)} method="post">
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
