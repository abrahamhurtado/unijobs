/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Link } from 'react-router';
import styles from './Menu.css';

let userMenu = (props, context) => {
  return (
    <ul>
      <li className={ `${styles.Menu} ${styles.MenuHome}` }><Link to="/dashboard">Dashboard</Link></li>
      <li className={ `${styles.Menu} ${styles.MenuNew}` }><Link to="/ofertas">Ofertas</Link></li>
      <li className={ `${styles.Menu} ${styles.MenuPerfil}` }><Link to="/perfil">{ context.user.nombre }</Link></li>
      <li className={ `${styles.Menu} ${styles.MenuLogout}` }><Link to="/signout">Logout</Link></li>
    </ul>
  );
};

let businessMenu = (props, context) => {
  return (
    <ul>
      <li className={ `${styles.Menu} ${styles.MenuHome}` }><Link to="/dashboard">Inicio</Link></li>
      <li className={ `${styles.Menu} ${styles.MenuCrear}` }><Link to="/creartrabajo">Crear</Link></li>
      <li className={ `${styles.Menu} ${styles.MenuPerfil}` }><Link to="/perfil">{ context.user.nombre }</Link></li>
      <li className={ `${styles.Menu} ${styles.MenuLogout}` }><Link to="/signout">Logout</Link></li>
    </ul>
  );
};

let userIsNotLoggedMenu = (props, context) => {
  return (
    <ul>
      <li className={ `${styles.Menu} ${styles.MenuHome}` }><Link to="/">Home</Link></li>
      <li className={ `${styles.Menu} ${styles.MenuLogin}` }><Link to="/login">Login</Link></li>
      <li className={ `${styles.Menu} ${styles.MenuSignup}` }><Link to="/signup">Sign up</Link></li>
    </ul>
  );
};

let userIsLoggedMenu = (props, context) => {
  if (context.type === 'usuario') {
    return userMenu(props, context);
  } else if (context.type === 'empresa') {
    return businessMenu(props, context);
  }
};

let Menu = (props, context) => {
  return (
    <div className={ styles.container }>
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
    _id: React.PropTypes.number
  }),
  type: React.PropTypes.string
};

export default Menu;
