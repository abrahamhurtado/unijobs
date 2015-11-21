import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import {User, Business, Job} from '../db/models';

const usuarios = new GraphQLObjectType({
  name: 'Usuarios',
  description: 'Los usuarios de UniJOBS',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'El id único de cada usuario'
    },
    nombre: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'El nombre del usuario'
    },
    edad: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'La edad del usuario'
    },
    genero: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'El género del usuario'
    },
    intereses: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      description: 'Los intereses del usuario'
    },
    descripcion: {
      type: GraphQLString,
      description: 'Información acerca del usuario'
    },
    correo: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'El correo con que el usuario se registró'
    },
    trabajos: {
      type: new GraphQLList(trabajos),
      description: 'Los trabajos que pueden interesar al usuario, según sus intereses y suscripciones',
      resolve (parent, args) {
        return Job.find({intereses: {"$in": parent.intereses}});
      }
    }
  })
});

const empresas = new GraphQLObjectType({
  name: 'Empresas',
  description: 'Las empresas que usan UniJOBS',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'El id de la empresa'
    },
    nombre: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'El nombre de la empresa'
    },
    intereses: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      description: 'Los intereses de las empresas'
    },
    descripcion: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Información acerca de la empresa'
    },
    correo: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'El correo de la compañía'
    },
    usuarios: {
      type: new GraphQLList(usuarios),
      description: 'Los usuarios que pueden interesar a la empresa',
      resolve (parent, args) {
        return User.find({})
            .where('intereses').in(parent.intereses);
      }
    },
    trabajosId: {
      type: new GraphQLList(new GraphQLObjectType({
        name: 'TrabajosID',
        fields: () => ({
          _id: {type: GraphQLInt}
        })
      }))
    },
    trabajos: {
      type: new GraphQLList(trabajos),
      description: 'Los trabajos que está ofreciendo la empresa',
      resolve (parent, args) {
        return Job.find({"empresaId._id": parent['_id']});
      }
    }
  })
});

const trabajos = new GraphQLObjectType({
  name: 'Trabajos',
  description: 'Los trabajos disponibles en UniJOBS',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'El id del trabajo'
    },
    titulo: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'El título del trabajo'
    },
    intereses: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      description: 'La intereses que se necesitan en el trabajo y se buscan en los aspirantes'
    },
    descripcion: {
      type: GraphQLString,
      description: 'La información sobre el trabajo.'
    },
    publicacion: {
      type: GraphQLInt,
      description: 'Momento de publicación del trabajo'
    },
    interesadosId: {
      type: new GraphQLList(new GraphQLObjectType({
        name: 'UsuariosID',
        fields: () => ({
          _id: {
            type: GraphQLInt
          }
        })
      }))
    },
    interesados: {
      type: new GraphQLList(usuarios),
      description: 'Los intersados en esta oferta de trabajo',
      resolve (parent, args) {
        Job.find({_id: parent._id}, (err, docs) => {
          const Users = docs[0].interesadosId.map((user) => User.findById(user._id));
          return Users;
        })
      }
    },
    empresaId: {
      type: new GraphQLObjectType({
        name: 'EmpresaID',
        fields: () => ({
          _id: {
            type: GraphQLInt
          }
        })
      })
    },
    empresa: {
      type: empresas,
      description: 'La empresa que ofrece este trabajo en UniJOBS',
      resolve (parent, args) {
        return Business.findById(parent.empresaId['_id']);
      }
    }
  })
});

export default {
  usuarios,
  empresas,
  trabajos
};
