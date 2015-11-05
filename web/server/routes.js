import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import { createLocation } from 'history';
import routes from '../shared/routes';
import html from '../shared/html';

export default () => (req, res) => {
  const location = createLocation(req.url);

  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.status(302).send(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res.status(200).send(html(renderToString(<RoutingContext {...renderProps} />)));
    } else {
      res.status(404).send('Not found');
    }
  });

};
