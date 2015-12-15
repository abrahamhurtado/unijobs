import React from 'react';
import RenderNoJobs from './RenderNoJobs';
import Job from '../../../components/Job';

let filtrar = (xd, filterText) =>
  xd.filter((x) => x.empresa)
    .filter((x) => (
      x.titulo.toLowerCase().includes(filterText.toLowerCase()) ||
      x.descripcion.toLowerCase().includes(filterText.toLowerCase()) ||
      x.intereses.includes(filterText) || x.intereses.includes(filterText.toLowerCase)
    ));

export default class JobsList extends React.Component {
  render () {
    const {trabajos, filterText} = this.props;
    const trabajosFiltrados = filtrar(trabajos, filterText);
    if (trabajosFiltrados.length > 0) {
      return (
        <ul>
          { trabajosFiltrados.map((trabajo, key) => (
            <Job
              trabajo={ trabajo }
              key={ key }
            />
          )) }
        </ul>
      );
    } else {
      return <RenderNoJobs {...this.props} />;
    }
  }
}
