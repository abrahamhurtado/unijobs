import React from 'react';
import { Link } from 'react-router';

let userMenu = (props, context) => {
  return (
    <ul>
      <li className="Menu Menu-home"><Link to="/dashboard">Dashboard</Link></li>
      <li className="Menu Menu-new"><Link to="/ofertas">Ofertas</Link></li>
      <li className="Menu Menu-perfil"><Link to="/perfil">{context.user.nombre}</Link></li>
      <li className="Menu Menu-logout"><Link to="/signout">Logout</Link></li>
    </ul>
  )
}

let businessMenu = (props, context) => {
  return (
    <ul>
      <li  className="Menu Menu-home"><Link to="/dashboard">Inicio</Link></li>
      <li className="Menu Menu-crear"><Link to="/creartrabajo">Crear</Link></li>
      <li  className="Menu Menu-perfil"><Link to="/perfil">{context.user.nombre}</Link></li>
      <li  className="Menu Menu-logout"><Link to="/signout">Logout</Link></li>
    </ul>
  )
}

let userIsNotLoggedMenu = (props, context) => {
  return (
    <ul>
      <li  className="Menu Menu-home"><Link to="/">Home</Link></li>
      <li  className="Menu Menu-login"><Link to="/login">Login</Link></li>
      <li  className="Menu Menu-signup"><Link to="/signup">Sign up</Link></li>
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
    <div className="container">
      <h1>
        <Link to="/">UNIJOBS</Link>
      </h1>
      <nav id="menu">
        { context.isAuthed ? userIsLoggedMenu(props, context) : userIsNotLoggedMenu(props, context) }
      </nav>
    </div>
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
