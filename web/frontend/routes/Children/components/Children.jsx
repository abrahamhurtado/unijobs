import React from 'react';
import { resolve } from 'react-resolver';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import ProtectedComponent from '../../../containers/Auth';

let Children = (props) => {
  const {trabajos} = props.payload.data;
  return (
    <ul>
      { trabajos.map((trabajo) => (
        <li key={ trabajo['_id'] }>
          <Link
            to={`/trabajo/${trabajo._id}`}
          >
            { trabajo.titulo }
          </Link>
        </li>)
      )}
    </ul>
  );
};

export default ProtectedComponent(resolve('payload', (props) => {
  if (props.isAuthed) return fetch('/graphql?query={trabajos{_id,titulo}}').then((r) => r.json());
})(Children));
