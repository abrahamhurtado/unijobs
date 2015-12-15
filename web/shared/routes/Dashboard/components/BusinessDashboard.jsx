import React from 'react';
import User from '../../../components/User';

let BusinessDashboard = (props) => {
  const { usuariosEmpresa, ultimosUsuarios } = props;

  return (
    <div>
      <h2>Según tus intereses: </h2>
      <ul>
        { usuariosEmpresa.map((usuario, key) => (
          <User
            usuario={ usuario }
            key={ key }
          />
        )) }
      </ul>
      <h2>Los más recientes</h2>
      <ul>
        { ultimosUsuarios.map((usuario, key) => (
          <User
            usuario={ usuario }
            key={ key }
          />
        )) }
      </ul>
    </div>
  );
};

export default BusinessDashboard;
