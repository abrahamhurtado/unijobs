import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import { createLocation } from 'history';
import routes from './shared/routes.jsx';
import serverRoutes from './routes/routes';

const app = express();
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  const webpack = require('webpack');
  const config = require('./webpack.config.babel');
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  console.log('dev mode with hot reload');
}

app.use(express.static('./frontend'));

function html (Component) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
      <title>UniJOBS</title>
    </head>
    <body>
      <div id="react-app">${Component}</div>
      <script type="text/javascript" src="./static/bundle.js"></script>
    </body>
  </html>
  `;
}

app.use(serverRoutes);

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
