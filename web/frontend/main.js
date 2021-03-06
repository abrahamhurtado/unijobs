import { render } from 'react-dom';
import { match } from 'react-router';
import { createLocation } from 'history';
import routes from '../shared/routes';
import Component from './routes';
import { Resolver } from 'react-resolver';

const location = createLocation(document.location.pathname + document.location.search);

match({routes, location}, (err, redirectLocation, props) => {
  Resolver.render(() => (
    Component
  ), document.getElementById('react-app'));
});
