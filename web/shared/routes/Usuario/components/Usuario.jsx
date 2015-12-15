import React from 'react';
import { resolve } from 'react-resolver';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import ProtectedComponent from '../../../containers/Auth';

class Usuario extends React.Component {
  constructor (props) {
    super(props);
  }
  componentWillMount () {
    if (this.props.payload.data.usuario === null) {
      this.props.history.pushState(null, '/');
    }
  }
  render () {
    const { usuario } = this.props.payload.data;
    return (
      <article>
        <image src="https://pbs.twimg.com/profile_images/661230840014245889/9tF0hL1Z.png" />
        <h2>{ usuario.nombre }</h2>
        <h3>{ `Acerca de ${usuario.nombre}` }</h3>
        <p>{ usuario.descripcion }</p>
        <h3>{ `A ${usuario.nombre} le interesan los siguientes tópicos:` }</h3>
        <ul>
          { usuario.intereses.map((interes, key) => (
            <li key={ `${Date.now()}_${key}` }>
              <Link to={ `/trabajos/clave/${interes}` }>
                { interes }
              </Link>
            </li>
          )) }
        </ul>
      </article>
    );
  }
}

export default ProtectedComponent(resolve('payload', (props) => {
  let query = `
    {
      usuario(id:${Number(props.params.id)}) {
        _id,
        nombre,
        intereses,
        descripcion
      }
    }
  `;

  return fetch(`/graphql?query=${query.trim()}`).then((r) => r.json());
})(Usuario));
