import React from 'react';
import { Link } from 'react-router';

export default class Job extends React.Component {
  render () {
    const { trabajo } = this.props;
    return (
      <li key={ trabajo['_id'] }>
        <article>
          <Link to={ `/trabajo/${trabajo._id}` }>
            <h2>{ trabajo.titulo }</h2>
          </Link>
          <Link to={ `/empresa/${trabajo.empresa._id}` }>
            <h3>{ `por ${trabajo.empresa.nombre}` }</h3>
          </Link>
          <p>{ trabajo.descripcion }</p>
          <ul>
            <li className="oferta-tags-1">Intereses: </li>
            { trabajo.intereses.map((interes, key) => (
              <li
                className="oferta-tags"
                key={ `${Date.now()}_interes_${key}` }
              >
                <Link to={ `/trabajo/clave/${interes}` }>
                  { interes }
                </Link>
              </li>
            )) }
          </ul>
        </article>
      </li>
    );
  }
}
