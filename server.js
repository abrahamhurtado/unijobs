import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import { createLocation } from 'history';
import routes from './shared/routes';
import html from './shared/html';
import schema from './routes/graphql';

import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import graphqlHTTP from 'express-graphql';

const app = express();
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  const webpack = require('webpack');
  const config = require('./webpack.config.development.babel');
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  console.log('dev mode with hot reload');
}

app.use(helmet());
app.use(compression());
app.use(morgan(env === "production" ? "combined" : "dev"));

app.use('/static', express.static('./frontend/build/'));

app.use('/graphql', graphqlHTTP({ schema:schema, pretty:true }));

app.use((req, res) => {
  const location = createLocation(req.url);
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.status(302).send(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res.status(200).send(html(ReactDOM.renderToString(<RoutingContext {...renderProps} />)));
    } else {
      res.status(404).send('Not found');
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('La aplicación corre en el puerto 3000');
});
