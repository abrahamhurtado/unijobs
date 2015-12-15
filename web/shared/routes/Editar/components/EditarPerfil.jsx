import React from 'react';
import { resolve } from 'react-resolver';
import fetch from 'isomorphic-fetch';
import ProtectedComponent from '../../../containers/Auth';
import EditarNegocio from './EditarNegocios';
import EditarUsuario from './EditarUsuarios';

class EditarPerfil extends React.Component {
  render () {
    if (this.props.type === 'usuario') {
      return <EditarUsuario { ...this.props }/>;
    } else if (this.props.type === 'empresa') {
      return <EditarNegocio { ...this.props } />;
    } else {
      return <h2>lolwut</h2>;
    }
  }
}

export default ProtectedComponent(resolve('payload', (props) => {
  const { type } = props;
  const { _id } = props.user;

  if (type === 'usuario') {
    let query = `
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
    let query = `
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
})(EditarPerfil));
