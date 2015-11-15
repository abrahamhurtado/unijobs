import express from 'express';

import session from 'express-session';
import MongoStore from 'connect-mongo';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import graphqlHTTP from 'express-graphql';
import schema from './server/api/schema';
import mongoose from 'mongoose';
import reactRouting from './server/routes.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import login from './server/login';

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

mongoose.connect('mongodb://localhost/unijobs');

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text({type: 'application/graphql'}));
app.use(cookieParser());
app.use(morgan(env === "production" ? "combined" : "dev"));
app.use(session({
  secret: 'unijobs',
  saveUninitialized: true,
  resave: true,
  store: new (MongoStore(session))({
    mongooseConnection: mongoose.connection
  })
}));

app.use('/static', express.static('./frontend/build/'));

app.use('/graphql', graphqlHTTP({ schema, pretty: true }));

app.use(login);

app.use(reactRouting());

app.listen(process.env.PORT || 3000, () => {
  console.log('La aplicación corre en el puerto 3000');
});
