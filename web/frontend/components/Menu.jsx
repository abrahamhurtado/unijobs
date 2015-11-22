import React from 'react';
import { Link } from 'react-router';

let userMenu = (props, context) => {
  return (
    <ul>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/ofertas">Ofertas</Link></li>
      <li><Link to="/perfil">{context.user.nombre}</Link></li>
      <li><Link to="/signout">Cerrar sesión</Link></li>
    </ul>
  )
}

let businessMenu = (props, context) => {
  return (
    <ul>
      <li><Link to="/dashboard">Inicio</Link></li>
      <li><Link to="/creartrabajo">Crear Trabajo</Link></li>
      <li><Link to="/perfil">{context.user.nombre}</Link></li>
      <li><Link to="/signout">Cerrar sesión</Link></li>
    </ul>
  )
}

let userIsNotLoggedMenu = (props, context) => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/ofertas">Ofertas</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">Sign up</Link></li>
    </ul>
  );
};

let userIsLoggedMenu = (props, context) => {
  if (context.type === "usuario") {
    return userMenu(props, context);
  } else if (context.type === "empresa") {
    return businessMenu(props, context);
  }
};

let Menu = (props, context) => {
  return (
    <nav>
      <h1>
        <Link to="/">UniJobs: tu puente al éxito</Link>
      </h1>
      { context.isAuthed ? userIsLoggedMenu(props, context) : userIsNotLoggedMenu(props, context) }
    </nav>
  );
};

Menu.contextTypes = {
  isAuthed: React.PropTypes.bool,
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
    _id: React.PropTypes.number,
  }),
  type: React.PropTypes.string
};

export default Menu;
