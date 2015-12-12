import React from 'react';
import { Link } from 'react-router';
import styles from './Landing.css';

export default class Landing extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className={styles['hero-container']}>
        <div className={styles['hero-image']}></div>
        <div className={styles['hero-text']}>
          <h2>Cruza el puente al éxito</h2>
          <h3>Estás a un clic de encontrar el empleo o al empleado indicado, ¿te animas?</h3>
          <Link to="/signup">
            <div className={styles.button}>
              ¡Me animo!
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
