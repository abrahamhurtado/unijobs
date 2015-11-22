import React from 'react';
import { Link } from 'react-router';

export default class SignUp extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render () {
    return (
      <div>
        <ul>
          <li key="link_1">
            <Link to="/signup/users">Usuario</Link>
          </li>
          <li key="link_2">
            <Link to="/signup/business">Negocios</Link>
          </li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}
