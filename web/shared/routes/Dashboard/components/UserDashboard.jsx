import React from 'react';
import Job from '../../../components/Job';

let UserDashboard = (props) => {
  let { trabajosUsuario, ultimosTrabajos } = props;
  trabajosUsuario = trabajosUsuario.filter((x) => x.empresa);
  ultimosTrabajos = trabajosUsuario.filter((x) => x.empresa);

  return (
    <div>
      <h2>Según tus intereses: </h2>
      <ul>
        { trabajosUsuario.map((trabajo, key) => (
          <Job
            trabajo={ trabajo }
            key={ key }
          />
        )) }
      </ul>
      <h2>Los más recientes: </h2>
      <ul>
        { ultimosTrabajos.map((trabajo, key) => (
          <Job
            trabajo={ trabajo }
            key={ key }
          />
        )) }
      </ul>
    </div>
  );
};

export default UserDashboard;
