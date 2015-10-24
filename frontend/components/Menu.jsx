import { Link } from 'react-router';

export default (React) => (props) => (
  <ul>
    <Link to="/">Home</Link>
    <Link to="/children">Children</Link>
  </ul>
);
