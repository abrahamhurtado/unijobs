import React from 'react';

export default class Login extends React.Component {
  render () {
    return (
      <div>
        <form>
          <p>Ingresa tu correo electrónico para registrarte</p>
          <input ref="mail" type="email" placeholder="mail@example.com"/>
        </form>
      </div>
    );
  }
}
