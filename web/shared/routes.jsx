import React from 'react';
import App from '../frontend/containers/App';
import Login from '../frontend/components/Login';
import SignUp from '../frontend/components/SignUp';
import fetch from 'isomorphic-fetch';
import jwt from 'jsonwebtoken';

let HolaMundo = (props) => <h2>{`Hola, Mundo`}</h2>;

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

export default {
  path: '/',
  component: App,
  indexRoute: {component: HolaMundo},
  childRoutes: [
    require('../frontend/routes/Children'),
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
    { path: '/signout', onEnter: logout, component: Login },
    require('../frontend/routes/Confirmation'),
    require('../frontend/routes/Job')
  ]
};
