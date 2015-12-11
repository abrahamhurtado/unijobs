import React from 'react';
import Menu from '../components/Menu';
import styles from './App.css';

export default class App extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div>
        <header>
          <Menu />
        </header>
        { this.props.children }
      </div>
    );
  }
}
