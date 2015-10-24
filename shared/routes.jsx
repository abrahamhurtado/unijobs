import React from 'react';
import { Route } from 'react-router';
import App from '../frontend/containers/App';
import Menu from '../frontend/components/Menu';
import Children from '../frontend/routes/Children/components/Children';

if (typeof require.ensure !== 'function') require.ensure = function (d, c) { c(require); };

export default {
  path: '/',
  component: App(React),
  childRoutes: [
    { path: '/nav', component: Menu(React) },
    { path: '/children', component: Children }
    // require('../frontend/routes/Children')
  ]
};
