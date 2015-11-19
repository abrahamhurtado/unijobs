import React from 'react';
import serializeForm from 'form-serialize';
import fetch from 'isomorphic-fetch';

export default class Login extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      mensaje: ''
    };
  }
  onSubmit (e) {
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
        <form
          className="login-form"
          action="/logUser"
          method="post"
          onSubmit={this.onSubmit.bind(this)}
        >
          {(!this.state.mensaje) ? (
            <p>Ingresa tu correo electrónico para iniciar sesión</p>
          ) : (
            <p className="successMessage">{`${this.state.mensaje}`}</p>
          )}
          <input
            ref="mail"
            type="email"
            placeholder="mail@example.com"
            name="correo"
          />
          <button
            type="submit"
            name="enviar"
          >
            Inicia sesión
          </button>
        </form>
      </div>
    );
  }
}
