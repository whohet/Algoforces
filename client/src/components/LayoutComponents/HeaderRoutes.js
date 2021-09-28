import { Nav, NavItem } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

function HeaderRoutes() {
  const { pathname } = useLocation();
  const routeData = [
    {
      title: 'Home',
      path: '/home',
    },
    {
      title: 'Problems',
      path: '/problemset',
    },
    {
      title: 'Leaderboard',
      path: '/leaderboard',
    },
    {
      title: 'FAQ',
      path: '/faq',
    },
    {
      title: 'About Us',
      path: '/aboutus',
    },
  ];
  return (
    <Nav className="me-auto">
      {routeData.map((route) => (
        <LinkContainer to={route.path} key={route.path}>
          <NavItem eventkey={1} className={`route-link ${pathname === route.path && 'route-selected'} `}>
            {route.title}
          </NavItem>
        </LinkContainer>
      ))}
    </Nav>
  );
}

export default HeaderRoutes;
