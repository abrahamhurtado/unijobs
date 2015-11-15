import React from 'react';

export default class Login extends React.Component {
  render () {
    return (
      <div>
        <form
          action="/logUser"
          method="post"
        >
          <p>Ingresa tu correo electrónico para registrarte</p>
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
