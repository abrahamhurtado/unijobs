import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';

let HolaMundo = ({ nombre }) => <h1>{ `Hola ${ nombre }!` }</h1>;

let router = express.Router();

router.get('/papu', (req, res) => {
  res.json({title: 'Hola papus'});
  // res.status(200).send(ReactDOM.renderToString(<HolaMundo nombre="Abraham"/>)).end();
});

export default router;
