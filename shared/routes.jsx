import React from 'react';
import { Route } from 'react-router';
import App from '../frontend/containers/App';
import Menu from '../frontend/components/Menu';
import Children from '../frontend/routes/Children/components/Children';
import Login from '../frontend/components/Login';
import SignUp from '../frontend/components/SignUp';

let HolaMundo = (props) => <h2>{`Hola, Mundo`}</h2>;

export default {
  path: '/',
  component: App,
  indexRoute: {component: HolaMundo},
  childRoutes: [
    { path: '/children', component: Children },
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp }
  ]
};
