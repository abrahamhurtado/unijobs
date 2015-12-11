import React from 'react';
import App from './containers/App';
import Login from './components/Login';
import Landing from './components/Landing';
import fetch from 'isomorphic-fetch';

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

function forceRefresh (Component) {
  return class ForceRefresh extends React.Component {
    constructor (props) {
      super(props);
    }
    componentDidMount () {
      this.props.history.pushState(null, '/login');
    }
    render () {
      return <Component {...this.props} />;
    }
  };
}

export default {
  path: '/',
  component: App,
  indexRoute: {component: Landing},
  childRoutes: [
    require('./routes/Children'),
    { path: '/login', component: Login },
    { path: '/signout', onEnter: logout, component: forceRefresh(Login) },
    require('./routes/Confirmation'),
    require('./routes/Job'),
    require('./routes/Empresa'),
    require('./routes/Usuario'),
    require('./routes/TrabajoKeyword'),
    require('./routes/Perfil'),
    require('./routes/Editar'),
    require('./routes/SignUp'),
    require('./routes/Dashboard'),
    require('./routes/CrearTrabajo'),
    require('./routes/EditarTrabajo')
  ]
};
