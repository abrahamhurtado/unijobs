import React from 'react';

export default class SignUp extends React.Component {
  render () {
    return (
      <form>
        <p>Ingresa tú información</p>
        <input type="text" placeholder="Tu nombre"/>
        <input type="email" placeholder="mail@example.com"/>
      </form>
    );
  }
}
