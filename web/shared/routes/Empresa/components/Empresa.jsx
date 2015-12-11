import React from 'react';
import { resolve } from 'react-resolver';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import ProtectedComponent from '../../../containers/Auth';

class Empresa extends React.Component {
  constructor (props) {
    super(props);
  }
  componentWillMount () {
    if (this.props.payload.data.empresa === null) {
      this.props.history.pushState(null, '/');
    }
  }
  render () {
    const { empresa } = this.props.payload.data;
    const { trabajos } = empresa;
    return (
      <article>
        <image src="https://pbs.twimg.com/profile_images/661230840014245889/9tF0hL1Z.png" />
        <h2>{ empresa.nombre }</h2>
        <h3>Acerca de la empresa</h3>
        <p>{ empresa.descripcion }</p>
        <h3>{ `Ofertas de trabajo por ${empresa.nombre}` }</h3>
        <ul>
          { trabajos.map((trabajo, key) => (
            <li key={ `${Date.now()}_${key}_${trabajo._id}` }>
              <Link to={ `/trabajo/${trabajo._id}` }>
                { trabajo.titulo }
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
      empresa(id:${Number(props.params.id)}) {
        _id,
        nombre,
        descripcion,
        trabajos {
          _id,
          titulo
        }
      }
    }
  `;

  return fetch(`/graphql?query=${query.trim()}`).then(r => r.json())
})(Empresa));
