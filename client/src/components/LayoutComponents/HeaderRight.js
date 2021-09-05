import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HeaderRight() {
  return (
    <Nav>
      <Link to={{ pathname: '/login', query: { method: 'signin' } }}>
        <button className="header-button header-login-button">Login</button>
      </Link>
      <Link to={{ pathname: '/login', query: { method: 'signup' } }}>
        <button className="header-button header-register-button">Sign up</button>
      </Link>
    </Nav>
  );
}

export default HeaderRight;
