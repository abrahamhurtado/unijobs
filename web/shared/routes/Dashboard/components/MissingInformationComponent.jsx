import React from 'react';
import { Link } from 'react-router';
import Job from '../../../components/Job';

let MissingInformationDashboard = (props) => {
  const {ultimosTrabajos} = props;
  const trabajosFiltrados = ultimosTrabajos.filter((x) => x.empresa);
  return (
    <div>
      <h2>Según tus intereses: </h2>
      <p>Oops, parece que te falta llenar información en tu perfil para darte recomendaciones personalizadas :(</p>
      <Link to="/editarperfil">
        <p>Ven aquí para llenar tu información.</p>
      </Link>
      <h2>Los más recientes:</h2>
      <ul>
        { trabajosFiltrados.map((trabajo, key) => (
          <Job
            trabajo={ trabajo }
            key={ key }
          />
        )) }
      </ul>
    </div>
  );
};

export default MissingInformationDashboard;
