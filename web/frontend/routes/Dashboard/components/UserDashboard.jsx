import React from 'react';
import { Link } from 'react-router';

let UserDashboard = (props) => {
  const {trabajosUsuario, ultimosTrabajos} = props;
  const trabajosFiltrados1 = trabajosUsuario.filter((x) => x.empresa);
  const trabajosFiltrados =
    ultimosTrabajos.filter((x) => x.empresa);
  return (
    <div>
      <h2>Según tus intereses: </h2>
      <ul>
        {trabajosFiltrados1.map((trabajo, key) => (
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
      <h2>Los más recientes:</h2>
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
    </div>
  )
}

export default UserDashboard;
