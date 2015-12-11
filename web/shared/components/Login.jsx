import React from 'react';
import serializeForm from 'form-serialize';
import fetch from 'isomorphic-fetch';
import styles from './Form.css';

export default class Login extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      message: '',
      success: false,
      error: false
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
    .then((r) => {
      if (r.errors) throw new Error(r.errors[0].message);
      this.setState({
        message: r.mensaje,
        success: true,
        error: false
      });
    })
    .catch(({mensaje: message}) => {
      this.setState({
        message,
        success: false,
        error: true
      });
    });
  }
  render () {
    const style = (this.state.success) ? styles.successMessage : styles.errorMessage;
    return (
      <div className={ styles.loginForm }>
        <form onSubmit={ this.onSubmit.bind(this) }>
          <h3>Introduce tu correo para iniciar sesión</h3>
          { (this.state.error || this.state.success) ? (
            <p className={ style }>{ this.state.message }</p>
          ) : null }
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
