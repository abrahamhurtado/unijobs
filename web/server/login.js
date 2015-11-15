/*eslint no-shadow:0*/
import express from 'express';
import jwt from 'jsonwebtoken';
import User from './db/UserSchema';
import Business from './db/BusinessSchema';
import enviarCorreo from './enviarCorreo';

let router = express.Router();

router.post('/logUser', (req, res) => {
  const {correo} = req.body;
  User.find({correo}, (err, usuario) => {
    if (err) {
      Business.find({correo}, (err2, empresa) => {
        if (empresa) {
          let {nombre, _id, correo} = empresa;
          let token = jwt.sign({nombre, _id}, 'unijobs', {algorithm: 'HS512', expiresIn: 31536000});
          enviarCorreo(token, nombre, correo);
          res.cookie('token', token, {maxAge: 1296000000, httpOnly: true});
          res.redirect('/');
        }
      });
    } else if (usuario) {
      let {nombre, _id, correo} = usuario[0];
      let token = jwt.sign({nombre, _id}, 'unijobs', {algorithm: 'HS512', expiresIn: 31536000});
      enviarCorreo(token, nombre, correo);
      res.cookie('token', token, {maxAge: 1296000000, httpOnly: true});
      res.redirect('/');
    } else {
      res.status(404).json({mensaje: 'No existe un usuario con este correo'});
    }
  });
});

export default router;
