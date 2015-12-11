import React from 'react';
import { resolve } from 'react-resolver';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import ProtectedComponent from '../../../containers/Auth';

class JobsKeyword extends React.Component {
  constructor (props) {
    super(props);
  }
  renderNoJobs () {
    return (
      <article>
        <h2>{`No tenemos ofertas para la palabra clave ${this.props.params.keyword} :(`}</h2>
        <h3><Link to="/ofertas">Regresa a la lista de ofertas</Link></h3>
      </article>
    )
  }
  renderJobs (trabajos) {
    return (
      <article>
        <h2>{`Tenemos ${trabajos.length} ofertas para ${this.props.params.keyword}`}</h2>
        <ul>
          {trabajos.map((trabajo, key) => (
              <li key={`${Date.now()}_${trabajo._id}`}>
                <Link to={`/trabajo/${trabajo._id}`}>
                  {`${trabajo.titulo}`}
                </Link>,
                <Link to={`/empresa/${trabajo.empresa._id}`}>
                  <span>
                    {`por ${trabajo.empresa.nombre}`}
                  </span>
                </Link>
              </li>
          ))}
        </ul>
      </article>
    )
  }
  render () {
    const {trabajosByKeyword: trabajos} = this.props.payload.data;
    if (trabajos.length > 0) {
      return this.renderJobs(trabajos);
    } else {
      return this.renderNoJobs();
    }
  }
}

export default ProtectedComponent(resolve('payload', (props) => {
  let query = `
    {
      trabajosByKeyword(keyword:"${props.params.keyword}") {
        _id,
        titulo,
        empresa {
          _id,
          nombre
        }
      }
    }
  `;

  return fetch(`/graphql?query=${query.trim()}`).then((r) => r.json());
})(JobsKeyword));
