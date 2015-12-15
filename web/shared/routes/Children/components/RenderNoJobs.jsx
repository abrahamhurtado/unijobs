import React from 'react';

export default class RenderNoJobs extends React.Component {
  render () {
    const { filterText } = this.props;
    return (
      <h2>
        { `No hay trabajos que coincidan con la búsqueda: ${filterText}` }
      </h2>
    );
  }
}
