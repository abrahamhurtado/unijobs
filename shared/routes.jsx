import React from 'react';
import { Route } from 'react-router';
import App from '../frontend/containers/App';
import ChildrenFactory from '../frontend/routes/Children/components/Children.jsx';
import testify from '../test/fixture/testify';

export default (
  <Route
    path="/"
    component={App(React)}
  >
    <Route
      path="children"
      component={testify(ChildrenFactory)(React)}
    />
  </Route>
);
