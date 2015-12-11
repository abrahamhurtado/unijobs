import React from 'react';
import serializeForm from 'form-serialize';
import fetch from 'isomorphic-fetch';
import styles from '../../../components/SignUp.css';

export default class SignUpUsers extends React.Component {
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
    .then((r) => r.json())
    .then((r) => {
      if (r.errors) throw new Error(r.errors[0].message);
      this.setState({
        success: true,
        error: false,
        message: 'Se creó el usuario'
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
  render () {
    const style = (this.state.success) ? styles.successMessage : styles.errorMessage;
    return (
      <div>
        { (this.state.error || this.state.success) ? (
          <p className={ style }>{ this.state.message }</p>
        ) : null }
        <form onSubmit={ this.onSubmit.bind(this) }>
          <p>Ingresa tú información</p>
          <label>Nombre</label>
          <input
            required
            type="text"
            name="nombre"
            placeholder="Tu nombre"
          />
          <label>Correo</label>
          <input
            required
            type="email"
            name="correo"
            placeholder="mail@example.com"
          />
          <label>Edad</label>
          <input
            required
            type="number"
            name="edad"
            placeholder="Tu edad"
          />
          <label>Edad</label>
          <input
            required
            type="text"
            name="genero"
            placeholder="Tu genero"
          />
          <button type="submit">Crear cuenta</button>
        </form>
      </div>
    );
  }
}
