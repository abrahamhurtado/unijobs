import React from 'react';
import fetch from 'isomorphic-fetch';
import serializeForm from 'form-serialize';
import Tags from './Tags';

export default class EditarNegocio extends React.Component {
  actualizarUsuario (e) {
    e.preventDefault();
    const { nombre, descripcion } = serializeForm(e.target, { hash: true });
    const { tags } = this.refs.tags.state;
    const { _id } = this.props.user;

    const query = `
      mutation {
        actualizarUsuario(id:${Number(_id)},nombre:"${nombre}",descripcion:"${descripcion}",intereses:"${tags}") {
          _id,
          nombre,
          descripcion,
          genero,
          edad,
          intereses
        }
      }
    `;

    fetch(`/graphql?query=${query.trim()}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((r) => r.json())
    .then((r) => {
      if (r.errors) throw new Error(r.errors);
      console.log('YAY, fue un éxito', r);
    })
    .catch((err) => {
      console.error(err);
    });
  }
  render () {
    const { nombre, descripcion, intereses, edad, genero } = this.props.payload.data.usuario;

    return (
      <div className="login-form">
        <h2>Edita tu perfil, { nombre }</h2>
        <form onSubmit={ this.actualizarUsuario.bind(this) }>
          <label>Nombre</label>
          <input
            required
            name="nombre"
            type="text"
            defaultValue={ nombre }
          />
          <label>Edad</label>
          <input
            required
            name="edad"
            type="number"
            defaultValue={ edad }
          />
          <label>Genero</label>
          <input
            required
            name="genero"
            type="text"
            defaultValue={ genero }
          />
          <label>Descripción</label>
          <textarea
            required
            name="descripcion"
            defaultValue={ descripcion }
          />
          <label>¿Cuáles son tus cualidades e intereses?</label>
          <Tags
            ref="tags"
            intereses={ intereses }
          />
          <button type="submit">
            Enviar
          </button>
        </form>
      </div>
    );
  }
}
