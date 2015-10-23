import React from 'react';
import { Route } from 'react-router';
import App from '../frontend/containers/App';
import ChildrenFactory from '../frontend/routes/Children/components/Children';

if (typeof require.ensure !== 'function') require.ensure = function (d, c) { c(require); };

export default {
  path: '/',
  component: App(React),
  childRoutes: [
    require('../frontend/routes/Children')
  ]
};
