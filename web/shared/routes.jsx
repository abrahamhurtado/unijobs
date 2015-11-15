import React from 'react';
import App from '../frontend/containers/App';
import Login from '../frontend/components/Login';
import SignUp from '../frontend/components/SignUp';

let HolaMundo = (props) => <h2>{`Hola, Mundo`}</h2>;

export default {
  path: '/',
  component: App,
  indexRoute: {component: HolaMundo},
  childRoutes: [
    require('../frontend/routes/Children'),
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
    require('../frontend/routes/Confirmation')
  ]
};
