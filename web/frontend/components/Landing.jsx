import React from 'react';
import { Link } from 'react-router';

export default class Landing extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className="hero-container">
        <div className="hero-image"></div>
        <div className="hero-text">
          <h2 className="hero-text-h2">Cruza el puente al éxito</h2>
          <h3 className="hero-text-h3">Estás a un clic de encontrar el empleo o al empleado indicado, ¿te animas?</h3>
          <Link to="/signup">
            <div className="button">
              ¡Me animo!
            </div>
          </Link>
        </div>
      </div>
    )
  }
}
