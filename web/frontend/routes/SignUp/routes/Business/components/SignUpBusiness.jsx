import React from 'react';
import serializeForm from 'form-serialize';
import fetch from 'isomorphic-fetch';
import Tags from '../../../../Editar/components/Tags';

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
    const intereses = [];
    return (
      <div>
        {(this.state.error && this.state.message) ? (<p>{this.state.message}</p>) : null }
        {(this.state.success) ? (<p>Fue un éxito, papus :)</p>) : null }
        {(!this.state.error && !this.state.success || !this.state.success) ? (
          <form onSubmit={this.onSubmit.bind(this)}>
            <p>Ingresa tú información</p>
            <label>Nombre</label>
            <p></p>
            <input required type="text" name="nombre" placeholder="El nombre de la empresa"/>
            <p></p>
            <label>Correo</label>
            <p></p>
            <input required type="email" name="correo" placeholder="mail@example.com"/>
            <p></p>
            <label>Descripción de la empresa</label>
            <p></p>
            <textarea required name="descripcion" placeholder="Descripción de la empresa"/>
            <p></p>
            <label>¿Cuáles son las áreas de interés de tu empresa?</label>
            <Tags ref="tags" intereses={intereses} />
            <button type="submit">Inicia sesión</button>
          </form>
        ) : null }
        {(this.state.success) ? (
          <form action="/logUser" onSubmit={this.login.bind(this)} method="post">
            <p>Ingresa tu correo electrónico para iniciar sesión</p>
            <input required ref="mail" type="email" placeholder="mail@example.com" name="correo"/>
            <button type="submit" name="enviar">
              Inicia sesión
            </button>
          </form>
        ) : null}
      </div>
    );
  }
}
