import React from 'react';
import fetch from 'isomorphic-fetch';
import serializeForm from 'form-serialize';
import Tags from './Tags';
import styles from '../../../components/Form.css';

export default class EditarNegocio extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      success: false,
      error: false
    };
  }
  actualizarUsuario (e) {
    e.preventDefault();
    const { nombre, descripcion } = serializeForm(e.target, { hash: true });
    const { tags } = this.refs.tags.state;
    const { _id } = this.props.user;

    const query = `
      mutation {
        actualizarUsuario(id:${Number(_id)},nombre:"${nombre}",descripcion:"${descripcion}",intereses:"${tags}") {
          _id,
          nombre,
          descripcion,
          genero,
          edad,
          intereses
        }
      }
    `;

    fetch(`/graphql?query=${query.trim()}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((r) => r.json())
    .then((r) => {
      if (r.errors) throw new Error(r.errors);
      this.setState({
        success: true,
        error: false,
        message: 'Se guardaron los datos correctamente'
      });
    })
    .catch((err) => {
      this.setState({
        success: false,
        error: true,
        message: 'Hubo un problema al guardar los datos'
      });
    });
  }
  render () {
    const { nombre, descripcion, intereses, edad, genero } = this.props.payload.data.usuario;
    const style = (this.state.success) ? styles.successMessage : styles.errorMessage;
    return (
      <div className={ styles.loginForm }>
        <h2>Edita tu perfil, { nombre }</h2>
        <form onSubmit={ this.actualizarUsuario.bind(this) }>
          <label>Nombre</label>
          <input
            required
            name="nombre"
            type="text"
            defaultValue={ nombre }
          />
          <label>Edad</label>
          <input
            required
            name="edad"
            type="number"
            defaultValue={ edad }
          />
          <label>Genero</label>
          <input
            required
            name="genero"
            type="text"
            defaultValue={ genero }
          />
          <label>Descripción</label>
          <textarea
            required
            name="descripcion"
            defaultValue={ descripcion }
          />
          <label>¿Cuáles son tus cualidades e intereses?</label>
          <Tags
            ref="tags"
            intereses={ intereses.map((x) => x.toLowerCase()) }
          />
          <button type="submit">
            Enviar
          </button>
          { (this.state.error || this.state.success) ? (
            <p className={ style }>{ this.state.message }</p>
          ) : null }
        </form>
      </div>
    );
  }
}
