import React from 'react';
import { Link } from 'react-router';

let User = (props) => {
  const { usuario } = props;
  return (
    <li key={ usuario['_id'] }>
      <article>
        <Link to={ `/usuario/${usuario._id}` }>
          <h2>{ usuario.nombre }</h2>
        </Link>
        <p>{ usuario.descripcion }</p>
        <ul>
          <li>Intereses: </li>
          { usuario.intereses.map((interes, key) => (
            <li key={ `${Date.now()}_interes_${key}` }>
              <Link to={ `/trabajo/clave/${interes}` }>
                { interes }
              </Link>
            </li>
          )) }
        </ul>
      </article>
    </li>
  );
};

export default User;
