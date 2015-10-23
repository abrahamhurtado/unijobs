import React from 'react';
import { Router } from 'react-router';
import { createHistory } from 'history';

import App from './containers/App.jsx';


const rootRoute = {
  path: '/',
  component: App(React),
  childRoutes: [
    require('./routes/Children')
  ]
};

export default (
  <Router
    history={ createHistory() }
    routes={ rootRoute }
  />
);
