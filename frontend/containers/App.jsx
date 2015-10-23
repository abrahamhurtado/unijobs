import { Link } from 'react-router';

export default (React) => {
  return React.createClass({
    displayName: 'MainSection',
    render () {
      return (
        <div>
          <h1>UniJOBS: tú puente al éxito</h1>
          <Link to="/children">Children</Link>
          {this.props.children}
        </div>
      );
    }
  });
};
