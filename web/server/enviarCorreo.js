import nodemailer from 'nodemailer';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import html from '../shared/html';
import React from 'react';
import email from './email';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  port: '465',
  auth: {
    user: 'crimsonvegan@gmail.com',
    pass: 'plasma360'
  }
});

export default (token, nombre, correo) => {
  transporter.sendMail({
    from: 'crimsonvegan@gmail.com',
    to: correo,
    subject: 'Bienvenido a UniJOBS',
    html: email(token, nombre, correo)
  }, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Se mandó el correo, páps', info.response);
    }
  });
};
