import React from 'react';
import serializeForm from 'form-serialize';
import fetch from 'isomorphic-fetch';
import Tags from '../../../../Editar/components/Tags';
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

    const {nombre, correo, descripcion, intereses} = serializeForm(e.target, {hash: true});
    const {tags} = this.refs.tags.state;

    const query = `
      mutation {
        crearEmpresa(nombre:"${nombre}", descripcion:"${descripcion}", intereses:"${tags}", correo:"${correo}")
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
        descripcion,
        intereses: tags
      })
    })
    .then((r) => r.json())
    .then((r) => {
      if (r.errors) throw new Error(r.errors[0].message);
      this.setState({
        success: true,
        error: false,
        message: "Se creó el usuario"
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
    const intereses = [];
    const style = (this.state.success) ? styles.successMessage : styles.errorMessage;
    return (
      <div>
        <form onSubmit={ this.onSubmit.bind(this) }>
          <p>Ingresa tú información</p>
          <label>Nombre</label>
          <input
            required
            type="text"
            name="nombre"
            placeholder="El nombre de la empresa"
          />
          <label>Correo</label>
          <input
            required
            type="email"
            name="correo"
            placeholder="mail@example.com"
          />
          <label>Descripción de la empresa</label>
          <textarea
            required
            name="descripcion"
            placeholder="Descripción de la empresa"
          />
          <label>¿Cuáles son las áreas de interés de tu empresa?</label>
          <Tags
            ref="tags"
            intereses={ intereses.map((x) => x.toLowerCase()) }
          />
          <button type="submit">Crear cuenta</button>
          { (this.state.error || this.state.success) ? (
            <p className={ style }>{ this.state.message }</p>
          ) : null }
        </form>
      </div>
    );
  }
}
