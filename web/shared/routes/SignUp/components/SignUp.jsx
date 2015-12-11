import React from 'react';
import { Link } from 'react-router';
import styles from './SignUp.css';

export default class SignUp extends React.Component {
  constructor (props, context) {
    super(props, context);
  }
  render () {
    return (
      <div className={ styles.loginForm }>
        <ul className={ styles.linkOptions }>
          <li key="link_1">
            <Link
              className={ styles.linkOptions1 }
              activeStyle={ {background: '#fff', color: '#333', borderBottomColor: '#fff', borderBottomLeftRadius: '0px'} }
              to="/signup/users"
            >
              Usuario
            </Link>
          </li>
          <li key="link_2">
            <Link
              className={ styles.linkOptions2 }
              activeStyle={ {background: '#fff', color: '#333', borderBottomColor: '#fff', borderBottomRightRadius: '0px'} }
              to="/signup/business"
            >
              Negocios
            </Link>
          </li>
        </ul>
        { this.props.children }
      </div>
    );
  }
}
