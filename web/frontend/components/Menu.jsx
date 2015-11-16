import React from 'react';
import { Link } from 'react-router';

let userIsNotLoggedMenu = (props) => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/ofertas">Ofertas</Link></li>
      <li><Link to="/login" state={{ modal: true, returnTo: props.location.pathname }}>Login</Link></li>
      <li><Link to="/signup" state={{ modal: true, returnTo: props.location.pathname }}>Sign up</Link></li>
    </ul>
  );
};

let userIsLoggedMenu = (props) => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/ofertas">Ofertas</Link></li>
      <li><Link to="/login" state={{ modal: true, returnTo: props.location.pathname }}>Log out</Link></li>
    </ul>
  );
};

let Menu = (props, context) => {
  return (
    <nav>
      <h1>
        <Link to="/">UniJobs: tu puente al éxito</Link>
      </h1>
      { context.isAuthed ? userIsLoggedMenu(props) : userIsNotLoggedMenu(props) }
    </nav>
  );
};

Menu.contextTypes = {
  isAuthed: React.PropTypes.bool
};

export default Menu;
