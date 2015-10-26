import { Link } from 'react-router';

export default (React) => (props) => (
  <nav>
    <h1>
      <Link to="/">UniJobs: tu puente al éxito</Link>
    </h1>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/children">Children</Link></li>
      <li><Link to="/login" state={{ modal: true, returnTo: props.location.pathname }}>Login</Link></li>
      <li><Link to="/signup" state={{ modal: true, returnTo: props.location.pathname }}>Sign up</Link></li>
    </ul>
  </nav>
);
