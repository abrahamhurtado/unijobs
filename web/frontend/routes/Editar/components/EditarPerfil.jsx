import React from 'react';
import { resolve } from 'react-resolver';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import ProtectedComponent from '../../../containers/Auth';
import Tags from './Tags';
import serializeForm from 'form-serialize';

class EditarPerfil extends React.Component {
  constructor (props) {
    super(props);
  }
  updateBusiness (e) {

  }
  updateUser (e) {
    e.preventDefault();
    const {nombre, descripcion} = serializeForm(e.target, {hash: true});
    const {tags} = this.refs.tags.state;
    const {_id} = this.props.user;

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
    })
  }
  renderBusinessForm () {
    const { nombre, descripcion, intereses, trabajos } = this.props.payload.data.empresa;
    return (
      <div>
        <h2>Edita tu perfil, {nombre}</h2>
        <form onSubmit={this.updateBusiness.bind(this)}>
          <label>
            Nombre
          </label>
          <p></p>
          <input
            required
            name="nombre"
            type="text"
            defaultValue={nombre}
          />
          <p></p>
          <label>
            Descripción
          </label>
          <p></p>
          <textarea
            required
            name="descripcion"
            defaultValue={descripcion}
          />
          <p></p>
          <label>Intereses y/o habilidades</label>
          <p></p>
          <Tags
            ref="tags"
            intereses={intereses}
          />
          <ul>
            Trabajos:
            {trabajos.map((trabajo, key) => (
              <li key={`${Date.now()}_key`}>
                <Link to={`/editarTrabajo/${key}`}>
                  {trabajo.nombre}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    )

  }
  renderUserForm () {
    const { nombre, descripcion, intereses, edad, genero } = this.props.payload.data.usuario;
    return (
      <div>
        <h2>Edita tu perfil, {nombre}</h2>
        <form onSubmit={this.updateUser.bind(this)}>
          <label>
            Nombre
          </label>
          <p></p>
          <input
            required
            name="nombre"
            type="text"
            defaultValue={nombre}
          />
          <p></p>
          <label>Edad: </label><input type="number" name="edad" defaultValue={edad} />
          <label>Genero: </label><input type="text" name="genero" defaultValue={genero} />
          <p></p>
          <label>
            Descripción
          </label>
          <p></p>
          <textarea
            required
            name="descripcion"
            defaultValue={descripcion}
          />
          <p></p>
          <label>Intereses y/o habilidades</label>
          <p></p>
          <Tags
            ref="tags"
            intereses={intereses}
          />
          <button
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    )
  }
  render () {
    if (this.props.type === 'usuario') {
      return this.renderUserForm();
    } else if (this.props.type === 'empresa') {
      return this.renderBusinessForm();
    }
  }
}

export default ProtectedComponent(resolve('payload', (props) => {
  const { type } = props;
  const { _id } = props.user;

  let query;

  if (type === 'usuario') {
    query = `
      {
        usuario(id:${Number(_id)}) {
          nombre,
          _id,
          descripcion,
          intereses,
          edad,
          genero
        }
      }
    `;
    return fetch(`/graphql?query=${query.trim()}`).then((r) => r.json());
  } else if (type === 'empresa') {
    query = `
      {
        empresa(id:${Number(_id)}) {
          nombre,
          _id,
          descripcion,
          intereses,
          trabajos {
            _id,
            titulo
          }
        }
      }
    `;
    return fetch(`/graphql?query=${query.trim()}`).then((r) => r.json());
  }
})(EditarPerfil))
