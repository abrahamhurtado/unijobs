import React from 'react';
import serializeForm from 'form-serialize';
import fetch from 'isomorphic-fetch';
import ProtectedComponent from '../../../containers/Auth';
import Tags from '../../Editar/components/Tags';

class CrearTrabajo extends React.Component {
  constructor (props) {
    super(props);
  }
  onSubmit (e) {
    e.preventDefault();
    const {_id} = this.props.user;
    const {titulo, descripcion} = serializeForm(e.target, {hash: true});
    const {tags} = this.refs.tags.state;

    const query = `
      mutation {
        crearTrabajo(id: ${Number(_id)}, titulo:"${titulo}", descripcion:"${descripcion}", intereses:"${tags}")
      }
    `;

    fetch(`/graphql?query=${query.trim()}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        titulo,
        descripcion,
        intereses: tags
      })
    })
    .then((r) => r.json())
    .then((r) => {
      if (r.errors) throw new Error(r.errors[0].message);
      console.log('Todo salió purrfect');
    })
    .catch((r) => {
      console.log('Ocurrió un error');
    });
  }
  render () {
    const intereses = [];
    return (
      <div className="login-form">
        <h2>Ingresa la información del trabajo</h2>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Título de la oferta</label>
          <input required type="text" name="titulo" placeholder=""/>
          <p></p>
          <label>Descripción de la oferta</label>
          <textarea required name="descripcion" placeholder="Descripción de la oferta"/>
          <label>¿Qué características buscan en los interesados?</label>
          <Tags ref="tags" intereses={intereses} />
          <button type="submit">Publicar trabajo</button>
        </form>
      </div>
    )
  }
}

export default ProtectedComponent(CrearTrabajo);
