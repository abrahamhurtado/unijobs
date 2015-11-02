import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
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
        intereses: {type: new GraphQLList(GraphQLString)},
        descripcion: {type: GraphQLString}
      },
      resolve (parent, {id, nombre, descripcion, intereses}) {
        return User.findByIdAndUpdate(id, {nombre, descripcion, intereses});
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
        intereses: {type: new GraphQLNonNull(new GraphQLList(GraphQLString)), description: 'Las características que se buscan en los aspirantes'}
      },
      resolve (parent, {id, titulo, descripcion, intereses}) {
        return Job.create({titulo, descripcion, intereses, empresaId: {_id: id}});
      }
    },
    actualizarTrabajo: {
      type: trabajos,
      description: 'Actualización de un trabajo',
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        titulo: {type: (GraphQLString)},
        descripcion: {type: GraphQLString},
        intereses: {type: new GraphQLList(GraphQLString)}
      },
      resolve (parent, args) {
        return Job.findByIdAndUpdate(args.id, {titulo: args.titulo, descripcion: args.descripcion, intereses: args.intereses});
      }
    },
    crearEmpresa: {
      type: GraphQLString,
      description: 'Creación de una nueva empresa',
      args: {
        nombre: {type: new GraphQLNonNull(GraphQLString)},
        descripcion: {type: new GraphQLNonNull(GraphQLString)},
        intereses: {type: new GraphQLNonNull(new GraphQLList(GraphQLString))}
      },
      resolve (parent, {nombre, descripcion, intereses}) {
        return Business.create({nombre, descripcion, intereses});
      }
    },
    actualizarEmpresa: {
      type: empresas,
      description: 'Actualización de una empresa',
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        nombre: {type: GraphQLString},
        descripcion: {type: GraphQLString},
        intereses: {type: new GraphQLList(GraphQLString)}
      },
      resolve (parent, {id, nombre, descripcion, intereses}) {
        return Business.findByIdAndUpdate(id, {nombre, descripcion, intereses});
      }
    }
  }
});

export default Mutations;
