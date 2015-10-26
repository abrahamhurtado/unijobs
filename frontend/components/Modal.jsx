import { Link } from 'react-router';

export default (React) => (props) => {

  const styles = {
    position: 'fixed',
    top: '20%',
    right: '20%',
    bottom: '20%',
    left: '20%',
    padding: 20,
    boxShadow: '0px 0px 150px 130px rgba(0, 0, 0, 0.5)',
    overflow: 'auto',
    background: '#fff'
  };

  const {returnTo, children} = props;

  return (
    <div style={styles}>
      <p><Link to={returnTo}>×</Link></p>
      {children}
    </div>
  );
};
