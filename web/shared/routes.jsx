import React from 'react';
import App from '../frontend/containers/App';
import Login from '../frontend/components/Login';
import Landing from '../frontend/components/Landing';
import fetch from 'isomorphic-fetch';
import jwt from 'jsonwebtoken';

function logout (nextState, replaceState) {
  fetch('/signUserOut', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
  .then((r) => r.json())
  .then((r) => {
    replaceState({
      nextPathname: nextState.location.pathname
    }, '/login');
  });
}

function requireAuth (nextState, replaceState) {
  if (typeof window !== 'undefined') {
    jwt.verify(window.__initialData__.token, 'unijobs', (err, success) => {
      if (err) {
        replaceState({
          nextPathname: nextState.location.pathname
        }, '/login');
      }
    });
  } else {
    fetch('/checkAuth', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then((r) => r.json())
    .then((r) => {
      if (!(r.auth === 'true')) {
        replaceState({
          nextPathname: nextState.location.pathname
        }, '/login');
      }
    });
  }
}

function forceRefresh (Component) {
  return class ForceRefresh extends React.Component {
    constructor (props) {
      super(props);
    }
    componentDidMount () {
      this.props.history.pushState(null, '/login');
    }
    render () {
      return <Component {...this.props} />
    }
  }
}

export default {
  path: '/',
  component: App,
  indexRoute: {component: Landing},
  childRoutes: [
    require('../frontend/routes/Children'),
    { path: '/login', component: Login },
    { path: '/signout', onEnter: logout, component: forceRefresh(Login) },
    require('../frontend/routes/Confirmation'),
    require('../frontend/routes/Job'),
    require('../frontend/routes/Empresa'),
    require('../frontend/routes/Usuario'),
    require('../frontend/routes/TrabajoKeyword'),
    require('../frontend/routes/Perfil'),
    require('../frontend/routes/Editar'),
    require('../frontend/routes/SignUp'),
    require('../frontend/routes/Dashboard'),
    require('../frontend/routes/CrearTrabajo')
  ]
};
