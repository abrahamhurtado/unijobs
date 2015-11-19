/*eslint no-shadow:0*/
import express from 'express';
import jwt from 'jsonwebtoken';
import User from './db/UserSchema';
import Business from './db/BusinessSchema';
import enviarCorreo from './enviarCorreo';
import isLinkExpired from '../shared/isLinkExpired';

let router = express.Router();

router.post('/logUser', (req, res) => {
  const {correo} = req.body;
  User.find({correo}, (err, usuario) => {
    if (err) {
      Business.find({correo}, (err2, empresa) => {
        if (empresa.length > 0) {
          let {nombre, _id, correo} = empresa;
          let token = jwt.sign({nombre, _id, tipo: 'empresa'}, 'unijobs', {algorithm: 'HS512', expiresIn: 31536000});
          enviarCorreo(token, nombre, correo);
        } else {
          res.status(404).json({mensaje: 'No existe un usuario con este correo'});
        }
      });
    } else if (usuario.length > 0) {
      let {nombre, _id, correo} = usuario[0];
      let token = jwt.sign({nombre, _id, tipo: 'usuario'}, 'unijobs', {algorithm: 'HS512', expiresIn: 31536000});
      enviarCorreo(token, nombre, correo);
      res.status(202).json({mensaje: 'Se envió el correo'});
    } else {
      res.status(404).json({mensaje: 'No existe un usuario con este correo'});
    }
  });
});

router.get('/confirm/:token/:expiration', (req, res) => {
  const {token, expiration} = req.params;
  if (isLinkExpired(expiration)) {
    res.redirect('/accountConfirmation');
  } else {
    jwt.verify(token, 'unijobs', (err, success) => {
      if (err) {
        res.status(404).redirect('/accountConfirmation');
      } else if (success) {
        res.cookie('token', req.params.token, {path: '/', maxAge: 1296000000, httpOnly: true});
        res.redirect(`/accountConfirmation/${token}/${expiration}`);
      }
    });
  }
});

router.post('/signUserOut', (req, res) => {
  res.clearCookie('token', {path: '/'});
  res.status(200).json({mensaje: 'Se cerró la sesión'});
});

router.post('/checkAuth', (req, res) => {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, 'unijobs', (err, success) => {
      if (err) {
        res.status(404).json({auth: 'false'});
      } else if (success) {
        res.status(200).json({auth: 'true'});
      }
    });
  } else {
    res.status(404).json({auth: 'false'});
  }
});

export default router;
