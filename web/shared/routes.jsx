import React from 'react';
import App from '../frontend/containers/App';
import Login from '../frontend/components/Login';
import SignUp from '../frontend/components/SignUp';
import fetch from 'isomorphic-fetch';

let HolaMundo = (props) => <h2>{`Hola, Mundo`}</h2>;

function logout (nextState, replaceState) {
  fetch('/logUserOut', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then((r) => r.json())
  .then((r) => {
    replaceState({
      nextPathname: nextState.location.pathname
    }, '/login');
  });
}

export default {
  path: '/',
  component: App,
  indexRoute: {component: HolaMundo},
  childRoutes: [
    require('../frontend/routes/Children'),
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
    { path: '/signout', onEnter: logout },
    require('../frontend/routes/Confirmation'),
    require('../frontend/routes/Job')
  ]
};
