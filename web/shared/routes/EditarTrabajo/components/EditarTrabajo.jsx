import React from 'react';
import { resolve } from 'react-resolver';
import fetch from 'isomorphic-fetch';
import serializeForm from 'form-serialize';
import ProtectedComponent from '../../../containers/Auth';
import Tags from '../../Editar/components/Tags';

class EditarTrabajo extends React.Component {
  actualizarTrabajo (e) {
    e.preventDefault();
    const { titulo, descripcion } = serializeForm(e.target, { hash: true });
    const { tags } = this.refs.tags.state;
    const { _id } = this.props.payload.data.trabajo;

    const query = `
      mutation {
        actualizarTrabajo(id:${Number(_id)},titulo:"${titulo}",descripcion:"${descripcion}",intereses:"${tags}") {
          _id,
          titulo,
          descripcion,
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
    const { titulo, descripcion, intereses } = this.props.payload.data.trabajo;

    return (
      <div className="login-form">
        <h2>Edita la oferta de trabajo</h2>
        <form onSubmit={ this.actualizarTrabajo.bind(this) }>
          <label>Título de la oferta</label>
          <input
            required
            name="titulo"
            type="text"
            defaultValue={ titulo }
          />
          <label>Descripción de la oferta</label>
          <textarea
            required
            name="descripcion"
            defaultValue={ descripcion }
          />
          <label>¿Qué características se buscan en los interesados?</label>
          <Tags
            ref="tags"
            intereses={ intereses.map((x) => x.toLowerCase()) }
          />
          <button type="submit">
            Actualizar oferta
          </button>
        </form>
      </div>
    );
  }
}

export default ProtectedComponent(resolve('payload', (props) => {
  const query = `
    {
      trabajo(id:${Number(props.params.id)}) {
        _id,
        titulo,
        descripcion,
        intereses
      }
    }
  `;

  return fetch(`/graphql?query=${query.trim()}`).then((r) => r.json());
})(EditarTrabajo));
