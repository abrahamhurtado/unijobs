import React from 'react';
import { resolve } from 'react-resolver';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import ProtectedComponent from '../../../containers/Auth';
import JobsList from './JobsList';
import styles from './Children.css';

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
        <div className={ styles.filterSearchTextContainer }>
          <h3>Busca trabajos mediante alguna palabra clave: </h3>
          <input
            type="text"
            placeholder=""
            onChange={ this.onChange.bind(this) }
          />
        </div>
        <JobsList
          trabajos={ trabajos }
          filterText={ this.state.filterText }
        />
      </div>
    );
  }
}

export default resolve('payload', (props) => {
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
  return fetch(`/graphql?query=${query.trim()}`).then((r) => r.json());
})(Children);
