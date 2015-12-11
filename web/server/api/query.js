import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

// import types from './types';

// const {usuarios, empresas, trabajos} = types;

import {usuarios, empresas, trabajos} from './types';

import {User, Business, Job} from '../db/models';

const Query = new GraphQLObjectType({
  name: 'busqueda',
  fields: {
    usuario: {
      type: usuarios,
      args: {
        id: {type: GraphQLInt}
      },
      resolve (parent, {id}) {
        return User.findById(id);
      }
    },
    usuarios: {
      type: new GraphQLList(usuarios),
      resolve (parent, args) {
        return User.find({});
      }
    },
    empresa: {
      type: empresas,
      args: {
        id: {type: GraphQLInt}
      },
      resolve (parent, {id}) {
        return Business.findById(id);
      }
    },
    empresas: {
      type: new GraphQLList(empresas),
      resolve (parent, args) {
        return Business.find({});
      }
    },
    trabajo: {
      type: trabajos,
      args: {
        id: {type: GraphQLInt}
      },
      resolve (parent, {id}) {
        return Job.findById(id);
      }
    },
    trabajos: {
      type: new GraphQLList(trabajos),
      resolve (parent, args) {
        return Job.find({});
      }
    },
    trabajosByKeyword: {
      type: new GraphQLList(trabajos),
      args: {
        keyword: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve (parent, {keyword}) {
        return Job.find({intereses: keyword});
      }
    }
  }
});

export default Query;
