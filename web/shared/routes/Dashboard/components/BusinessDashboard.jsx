import React from 'react';
import { Link } from 'react-router';

let BusinessDashboard = (props) => {
  const {usuariosEmpresa, ultimosUsuarios} = props;
  return (
    <div>
      <h2>Según tus intereses: </h2>
      <ul>
        {usuariosEmpresa.map((usuario, key) => (
          <li key={ usuario['_id'] }>
            <article>
              <Link
                to={`/usuario/${usuario._id}`}
              >
                <h2>{ usuario.nombre }</h2>
              </Link>
              <p>{usuario.descripcion}</p>
              <ul>
                <li>Intereses: </li>
                {usuario.intereses.map((interes, key) => (
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
        {ultimosUsuarios.map((usuario, key) => (
          <li key={ usuario['_id'] }>
            <article>
              <Link
                to={`/usuario/${usuario._id}`}
              >
                <h2>{ usuario.nombre }</h2>
              </Link>
              <p>{usuario.descripcion}</p>
              <ul>
                <li>Intereses: </li>
                {usuario.intereses.map((interes, key) => (
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

export default BusinessDashboard;
