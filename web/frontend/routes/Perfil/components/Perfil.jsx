import React from 'react';
import { resolve } from 'react-resolver';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import ProtectedComponent from '../../../containers/Auth';

class Perfil extends React.Component {
  constructor (props, context) {
    super(props, context);
  }
  render () {
    const { usuario } = this.props.payload.data;
    return (
      <article>
        <image src="https://pbs.twimg.com/profile_images/661230840014245889/9tF0hL1Z.png" />
        <h2>{usuario.nombre}</h2>
        <h3>{`Acerca de ${usuario.nombre}`}</h3>
        <p>{usuario.descripcion}</p>
        <h3>{`A ${usuario.nombre} le interesan los siguientes tópicos:`}</h3>
        <ul>
          {usuario.intereses.map((interes, key) => (
            <li key={`${Date.now()}_${key}`}>
              <Link to={`/trabajos/clave/${interes}`}>
                {interes}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/perfil/editar">
          Editar perfil
        </Link>
      </article>
    );
  }
}

export default ProtectedComponent(resolve('payload', (props) => {
  const { _id } = props.user;
  let query = `
    {
      usuario(id:${Number(_id)}) {
        nombre,
        _id,
        descripcion,
        intereses
      }
    }
  `;

  return fetch(`/graphql?query=${query.trim()}`).then((r) => r.json());
})(Perfil))
