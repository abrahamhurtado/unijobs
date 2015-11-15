import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import { createLocation } from 'history';
import routes from '../shared/routes';
import html from '../shared/html';
import jwt from 'jsonwebtoken';
import Provider from '../frontend/components/Provider';

export default () => (req, res) => {

  let initialData = {
    isAuthed: false,
    user: {
      nombre: '',
      _id: 0
    },
    token: ''
  };

  const location = createLocation(req.url);

  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.status(302).send(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      if (req.cookies.token) {
        jwt.verify(req.cookies.token, 'unijobs', (err, success) => {
          if (success) {
            initialData.isAuthed = true;
            initialData.user.nombre = success.nombre;
            initialData.user._id = success._id;
            initialData.token = req.cookies.token;
          }
          res.status(200).send(html(renderToString(
            <Provider initialData={initialData}>
              <RoutingContext {...renderProps} />
            </Provider>
          ), initialData));
        });
      } else {
        res.status(200).send(html(renderToString(
          <Provider initialData={initialData}>
            <RoutingContext {...renderProps} />
          </Provider>
        ), initialData));
      }
    } else {
      res.status(404).send('Not found');
    }
  });

};
