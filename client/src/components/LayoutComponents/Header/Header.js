import "./Header.css";
import { Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import HeaderRoutes from "./HeaderRoutes";
import HeaderRight from "./HeaderRight";
import Logo from "../../../assets/logo192.png";
import { useLocation } from "react-router";

function Header() {
  const { pathname } = useLocation();
  return (
    <div id="header-container" className={`${pathname === "/" ? "header-no-bg" : "header-bg-white"}`}>
      <Navbar collapseOnSelect expand="lg" variant="light">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img alt="logo" src={Logo} height="35" className="header-logo d-inline-block align-center" /> Algoforces
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <HeaderRoutes></HeaderRoutes>
            <HeaderRight></HeaderRight>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <div className="header-left">
        <div className='header-title'>
          <h2>ALGOFORCES</h2>
        </div>
        <div className='header-route-container'>
          <div className='header-route'>Problems</div>
          <div className='header-route'>LeaderBoard</div>
          <div className='header-route'>About Us</div>
        </div>
      </div>
      <div className="header-right">
        <div>
          <Link to={{ pathname: '/login', query: { method: 'signin' } }}>Login</Link>
        </div>
        <div>
          <Link to={{ pathname: '/login', query: { method: 'signup' } }}>Register</Link>
        </div>
      </div> */}
    </div>
  );
}

export default Header;
