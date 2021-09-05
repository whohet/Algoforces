import { Nav, NavItem } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

function HeaderRoutes() {
  const { pathname } = useLocation();
  return (
    <Nav className="me-auto">
      <LinkContainer to="/problemset">
        <NavItem eventkey={1} className={`route-link ${pathname === '/problemset' && 'route-selected'} `}>
          Problems
        </NavItem>
      </LinkContainer>
      <LinkContainer to="/leaderboard">
        <NavItem eventkey={1} className={`route-link ${pathname === '/leaderboard' && 'route-selected'} `}>
          Leaderboard
        </NavItem>
      </LinkContainer>
      <LinkContainer to="/aboutus">
        <NavItem eventkey={1} className={`route-link ${pathname === '/aboutus' && 'route-selected'} `}>
          About Us
        </NavItem>
      </LinkContainer>
    </Nav>
  );
}

export default HeaderRoutes;
