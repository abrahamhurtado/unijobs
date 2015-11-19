import React from 'react';
import { resolve } from 'react-resolver';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import ProtectedComponent from '../../../containers/Auth';
import JobsList from './JobsList';

class Children extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      filterText: ''
    };
  }
  onChange (e) {
    e.preventDefault();
    this.setState({
      filterText: e.target.value
    });
  }
  render () {
    const {trabajos} = this.props.payload.data;
    return (
      <div>
        <input
          type="text"
          placeholder="Busca un término, ya sea una palabra clave, o el nombre de una empresa"
          onChange={ this.onChange.bind(this) }
        />
        <JobsList
          trabajos={ trabajos }
          filterText={ this.state.filterText }
        />
      </div>
    );
  }
}

export default ProtectedComponent(resolve('payload', (props) => {
  let query = `
    {
      trabajos {
        _id,
        titulo,
        intereses,
        descripcion,
        empresa {
          _id,
          nombre
        }
      }
    }
  `;
  if (props.isAuthed) return fetch(`/graphql?query=${query.trim()}`).then((r) => r.json());
})(Children));
