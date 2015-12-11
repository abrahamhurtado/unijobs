import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from 'graphql';

import {usuarios, empresas, trabajos} from './types';

import {User, Business, Job} from '../db/models';

const Mutations = new GraphQLObjectType({
  name: 'mutations',
  fields: {
    actualizarUsuario: {
      type: usuarios,
      description: 'Actualización de los datos del usuario',
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        nombre: {type: GraphQLString},
        intereses: {type: GraphQLString},
        descripcion: {type: GraphQLString}
      },
      resolve (parent, {id, nombre, descripcion, intereses}) {
        const interesesBien = intereses.split(',');
        return User.findByIdAndUpdate(id, {nombre, descripcion, intereses: interesesBien});
      }
    },
    crearUsuario: {
      type: GraphQLString,
      description: 'Creación de un nuevo usuario',
      args: {
        nombre: {type: new GraphQLNonNull(GraphQLString)},
        correo: {type: new GraphQLNonNull(GraphQLString)},
        edad: {type: new GraphQLNonNull(GraphQLInt)},
        genero: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve (parent, {nombre, correo, edad, genero}) {
        Business.find({correo}, (err, docs) => {
          if (err || docs === null || docs.length > 0) {
            return new Error('Ya existe un usuario con este correo');
          } else {
            User.find({correo}, (err2, docs2) => {
              if (err || docs2.length > 0) return new Error('Ya existe un usuario con este correo');
            });
          }
        });
        return User.create({nombre, correo, edad, genero});
      }
    },
    borrarUsuario: {
      type: GraphQLString,
      description: 'Eliminación de un usuario',
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve (parent, {id}) {
        return (User.findById(id)).remove({_id: id}, () => {});
      }
    },
    crearTrabajo: {
      type: GraphQLString,
      description: 'Creación de un nuevo trabajo',
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt), description: 'El id de la empresa que ofrece el trabajo'},
        titulo: {type: new GraphQLNonNull(GraphQLString), description: 'El título del trabajo que se ofrecerá'},
        descripcion: {type: new GraphQLNonNull(GraphQLString), description: 'Detalles del trabajo a ofrecer'},
        intereses: {type: new GraphQLNonNull((GraphQLString)), description: 'Las características que se buscan en los aspirantes'}
      },
      resolve (parent, {id, titulo, descripcion, intereses}) {
        const interesesBien = intereses.split(',');
        return Job.create({titulo, descripcion, intereses: interesesBien, empresaId: {_id: id}, activo: true});
      }
    },
    actualizarTrabajo: {
      type: trabajos,
      description: 'Actualización de un trabajo',
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        titulo: {type: (GraphQLString)},
        descripcion: {type: GraphQLString},
        intereses: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve (parent, {id, titulo, descripcion, intereses}) {
        const interesesBien = intereses.split(',');
        return Job.findByIdAndUpdate(id, {titulo, descripcion, intereses: interesesBien});
      }
    },
    crearEmpresa: {
      type: GraphQLString,
      description: 'Creación de una nueva empresa',
      args: {
        nombre: {type: new GraphQLNonNull(GraphQLString)},
        descripcion: {type: new GraphQLNonNull(GraphQLString)},
        intereses: {type: new GraphQLNonNull((GraphQLString))},
        correo: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve (parent, {nombre, descripcion, intereses, correo}) {
        User.find({correo}, (err, docs) => {
          if (err || docs === null | docs.length > 0) {
            return new Error('Ya existe un usuario con este correo');
          } else {
            Business.find({correo}, (err2, docs2) => {
              if (err || docs2.length > 0) return new Error('Ya existe un usuario con este correo');
            });
          }
        });
        const interesesBien = intereses.split(',');
        return Business.create({nombre, descripcion, intereses: interesesBien, correo});
      }
    },
    actualizarEmpresa: {
      type: empresas,
      description: 'Actualización de una empresa',
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        nombre: {type: GraphQLString},
        descripcion: {type: GraphQLString},
        intereses: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve (parent, {id, nombre, descripcion, intereses}) {
        const interesesBien = intereses.split(',');
        return Business.findByIdAndUpdate(id, {nombre, descripcion, intereses: interesesBien});
      }
    }
  }
});

export default Mutations;
