import React from 'react';
import { Link } from 'react-router';

export default class JobsList extends React.Component {
  constructor (props) {
    super(props);
  }
  renderNoJobs () {
    return <h2>{`No hay trabajos que coincidan con la búsqueda: ${this.props.filterText}`}</h2>;
  }
  renderJobs (trabajosFiltrados) {
    return (
      <ul>
        {trabajosFiltrados.map((trabajo, key) => (
          <li key={ trabajo['_id'] }>
            <article>
              <Link
                to={`/trabajo/${trabajo._id}`}
              >
                <h2>{ trabajo.titulo }</h2>
              </Link>
              <Link
                to={`/empresa/${trabajo.empresa._id}`}
              >
                <h3>{`por ${trabajo.empresa.nombre}`}</h3>
              </Link>
              <p>{trabajo.descripcion}</p>
              <ul>
                <li>Intereses: </li>
                {trabajo.intereses.map((interes, key) => (
                  <li key={`${Date.now()}_interes_${key}`}>
                    <Link to={`/trabajo/clave/${interes}`}>
                      {interes}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    );
  }
  render () {
    const {trabajos, filterText} = this.props;
    const trabajosFiltrados =
      trabajos.filter((x) => x.empresa)
              .filter((x) =>
                x.titulo.toLowerCase().includes(filterText.toLowerCase()) ||
                x.descripcion.toLowerCase().includes(filterText.toLowerCase()) ||
                x.intereses.includes(filterText) || x.intereses.includes(filterText.toLowerCase)
              );
    if (trabajosFiltrados.length > 0) {
      return this.renderJobs(trabajosFiltrados);
    } else {
      return this.renderNoJobs();
    }
  }
}
