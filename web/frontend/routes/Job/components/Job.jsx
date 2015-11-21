import React from 'react';
import { resolve } from 'react-resolver';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import ProtectedComponent from '../../../containers/Auth';

let Job = (props) => {
  const {trabajo} = props.payload.data;
  const {empresa} = trabajo;
  return (
    <article>
      <image src="https://pbs.twimg.com/profile_images/661230840014245889/9tF0hL1Z.png" />
      <h2>{trabajo.titulo}</h2>
      <h3>publicado por <Link to={`/empresa/${empresa._id}`}>{empresa.nombre}</Link></h3>
      <p>{trabajo.descripcion}</p>
      <div>
        <p>Etiquetas:</p>
        <ul>
          {trabajo.intereses.map((interes, key) => (
            <li key={`${Date.now()}_${key}_${interes}}`}>
              <Link to={`/trabajo/clave/${interes}`}>
                {interes}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Más ofertas de {empresa.nombre}:</h4>
        <ul>
          {empresa.trabajos.map((trabajo, key) => (
            <li key={`${Date.now()}_${key}_${trabajo._id}`}>
              <Link to={`/trabajo/${trabajo._id}`}>
                {trabajo.titulo}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};
export default ProtectedComponent(resolve('payload', (props) => {
  if (props.isAuthed) return fetch(`/graphql?query={trabajo(id:${Number(props.params.id)}){_id,titulo,descripcion,intereses,publicacion,empresa{_id,nombre,trabajos{_id,titulo}}}}`).then((r) => r.json());
})(Job));
