export default [
  {
    _id: 0,
    nombre: 'Abraham',
    edad: 18,
    genero: 'hombre',
    intereses: [
      'programacion',
      'javascript'
    ],
    descripcion: 'Desarrollador web y móvil en CSIPRO. JavaScript, Node, React, React Native y Swift.',
    suscripciones: [
      {id: 2}
    ],
    correo: 'mi@correo.com'
  },
  {
    _id: 1,
    nombre: 'Diego',
    edad: 18,
    descripcion: 'Diseño de experiencias (UX) e interfaces (UI) en CSIPRO.',
    genero: 'hombre',
    intereses: [
      'arte',
      'photoshop',
      'dibujos'
    ],
    suscripciones: [
      {_id: 2}
    ],
    correo: 'su@correo.com'
  },
  {
    _id: 2,
    nombre: 'Saúl',
    edad: 19,
    descripcion: 'Un tío muy guay',
    genero: 'hombre',
    intereses: [
      'programación',
      'android',
      'java'
    ],
    correo: 'el@correo.com',
    suscripciones: [
      {_id: 0}
    ]
  }
];
