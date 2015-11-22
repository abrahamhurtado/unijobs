import React from 'react';
import { Link } from 'react-router';
import { resolve } from 'react-resolver';
import fetch from 'isomorphic-fetch';
import ProtectedComponent from '../../../containers/Auth';
import UserDashboard from './UserDashboard';
import BusinessDashboard from './BusinessDashboard';
import MissingInformationDashboard from './MissingInformationComponent';

class Dashboard extends React.Component {
  constructor (props, context) {
    super(props, context);
  }
  render () {
    if (this.props.type === 'usuario') {
      if (this.props.payload.data.usuario.trabajos.length > 0) {
        const {usuario, trabajos} = this.props.payload.data;
        return <UserDashboard trabajosUsuario={usuario.trabajos} ultimosTrabajos={trabajos} />
      } else {
        const {trabajos} = this.props.payload.data;
        return <MissingInformationDashboard ultimosTrabajos={trabajos}/>;
      }
    } else if (this.props.type === 'empresa') {
      const {empresa, usuarios} = this.props.payload.data;
      return <BusinessDashboard usuariosEmpresa={empresa.usuarios} ultimosUsuarios={usuarios}/>
    }
  }
}
export default ProtectedComponent(resolve('payload', (props) => {
  if (props.type === 'usuario') {
    const {_id} = props.user;
    let query = `
      {
        usuario(id:${Number(_id)}) {
          trabajos {
            _id,
            titulo,
            descripcion,
            intereses,
            empresa {
              _id,
              nombre
            }
          }
        },
        trabajos {
          _id,
          titulo,
          descripcion,
          intereses,
          empresa {
            _id,
            nombre
          }
        }
      }
    `;
    return fetch(`/graphql?query=${query.trim()}`).then(r => r.json());
  } else {
    const {_id} = props.user;
    let query = `
      {
        empresa(id:${Number(_id)}) {
          usuarios {
            _id,
            nombre,
            descripcion,
            intereses
          }
        },
        usuarios {
          _id,
          nombre,
          descripcion,
          intereses
        }
      }
    `;
    return fetch(`/graphql?query=${query.trim()}`).then(r => r.json());
  }
})(Dashboard));
