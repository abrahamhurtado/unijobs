import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import {
  usersDB,
  businessDB,
  jobsDB
} from '../shared/api';

const usuarios = new GraphQLObjectType({
  name: 'Usuarios',
  description: 'Los usuarios de UniJOBS',
  fields: () => ({
    id: {
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
        return Array.from(new Set(
          parent.intereses.map((word) => {
            return [for (i of Object.keys(jobsDB)) jobsDB[i]].filter(({intereses}) => intereses.includes(word));
          }).reduce((x, y) => x.concat(y), [])
        ));
      }
    }
  })
});

const empresas = new GraphQLObjectType({
  name: 'Empresas',
  description: 'Las empresas que usan UniJOBS',
  fields: () => ({
    id: {
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
      type: GraphQLString,
      description: 'Información acerca de la empresa'
    },
    trabajos: {
      type: new GraphQLList(trabajos),
      description: 'Los trabajos que está ofreciendo la empresa',
      resolve (parent, args) {
        return [for (i of Object.keys(jobsDB)) jobsDB[i]].filter((trabajo) => trabajo.empresaId.id === parent.id);
      }
    }
  })
});

const trabajos = new GraphQLObjectType({
  name: 'Trabajos',
  description: 'Los trabajos disponibles en UniJOBS',
  fields: () => ({
    id: {
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
    empresaId: {
      type: new GraphQLObjectType({
        name: 'EmpresaID',
        fields: () => ({
          id: {
            type: GraphQLInt
          }
        })
      })
    },
    empresa: {
      type: (empresas),
      description: 'La empresa que ofrece este trabajo en UniJOBS',
      resolve (parent, args) {
        return [for (i of Object.keys(businessDB)) businessDB[i]].filter((empresa) => empresa.id === parent.empresaId.id).reduce((a, b) => b, {});
      }
    }
  })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'busqueda',
    fields: {
      usuario: {
        type: usuarios,
        args: {
          id: {type: GraphQLInt}
        },
        resolve (parent, {id}) {
          return [for (i of Object.keys(usersDB)) usersDB[i]].filter((usuario) => usuario.id === id).reduce((a, b) => b, {});
        }
      },
      usuarios: {
        type: usuarios,
        resolve (parent, args) {
          return [for (i of Object.keys(usersDB)) usersDB[i]];
        }
      },
      empresa: {
        type: empresas,
        args: {
          id: {type: GraphQLInt}
        },
        resolve (parent, {id}) {
          return [for (i of Object.keys(businessDB)) businessDB[i]].filter((empresa) => empresa.id === id).reduce((a, b) => b, {});
        }
      },
      trabajo: {
        type: trabajos,
        args: {
          id: {type: GraphQLInt}
        },
        resolve (parent, {id}) {
          return [for (i of Object.keys(jobsDB)) jobsDB[i]].filter((trabajo) => trabajo.id === id).reduce((a, b) => b, {});
        }
      }
    }
  })
});

console.log('GraphQL API lista');

export default schema;
