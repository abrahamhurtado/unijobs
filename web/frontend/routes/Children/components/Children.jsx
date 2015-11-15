import React from 'react';
import { resolve } from 'react-resolver';
import fetch from 'isomorphic-fetch';
import ProtectedComponent from '../../../containers/Auth';

let Children = (props) => {
  const {trabajos} = props.payload.data;
  return (
    <ul>
      { trabajos.map((trabajo) => <li key={ trabajo['_id'] }>{ trabajo.titulo }</li>) }
    </ul>
  );
};

export default ProtectedComponent(resolve('payload', (props) => {
  if (props.isAuthed) return fetch('http://localhost:3000/graphql?query={trabajos{_id,titulo}}').then((r) => r.json());
})(Children));
