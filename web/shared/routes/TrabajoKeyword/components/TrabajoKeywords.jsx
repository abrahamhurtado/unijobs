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

// let Job = (props) => {
//   const {trabajo} = props.payload.data;
//   const {empresa} = trabajo;
//   return (
//     <article>
//       <image src="https://pbs.twimg.com/profile_images/661230840014245889/9tF0hL1Z.png" />
//       <h2>{trabajo.titulo}</h2>
//       <h3>publicado por <Link to={`/empresa/${empresa._id}`}>{empresa.nombre}</Link></h3>
//       <p>{trabajo.descripcion}</p>
//       <div>
//         <h4>Más ofertas de {empresa.nombre}:</h4>
//         <ul>
//           {empresa.trabajos.map((trabajo, key) => (
//             <li key={`${Date.now()}_${key}_${trabajo._id}`}>
//               <Link to={`/trabajo/${trabajo._id}`}>
//                 {trabajo.titulo}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </article>
//   );
// };
// export default ProtectedComponent(resolve('payload', (props) => {
//   if (props.isAuthed) return fetch(`/graphql?query={trabajo(id:${Number(props.params.id)}){_id,titulo,descripcion,empresa{_id,nombre,trabajos{_id,titulo}}}}`).then((r) => r.json());
// })(Job));
