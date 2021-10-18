import { useContext } from "react";
import { useLocation } from "react-router";
import { Col, Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Logo from "../../../assets/logo192.png";
import UserContext from "../../../context/UserContext";
import HeaderRoutes from "./HeaderRoutes";
import HeaderRight from "./HeaderRight";

import "./Header.css";

function Header() {
  const { pathname } = useLocation();
  const userContext = useContext(UserContext);
  return (
    <div id="header-container" className={`${pathname === "/" ? "header-no-bg" : "header-bg-white"}`}>
      <Navbar collapseOnSelect expand="lg" variant="light">
        <Container className="d-none d-lg-flex">
          <LinkContainer to="/">
            <Navbar.Brand>
              <img alt="logo" src={Logo} height="35" className="header-logo d-inline-block align-center" /> Algoforces
            </Navbar.Brand>
          </LinkContainer>
          <HeaderRoutes></HeaderRoutes>
          <HeaderRight></HeaderRight>
        </Container>

        <Container className="d-lg-none">
          <LinkContainer to="/">
            <Navbar.Brand>
              <img alt="logo" src={Logo} height="35" className="header-logo d-inline-block align-center" /> Algoforces
            </Navbar.Brand>
          </LinkContainer>
          <Col className="d-none d-lg-flex">
            <HeaderRoutes></HeaderRoutes>
            <HeaderRight></HeaderRight>
          </Col>

          {userContext.isAuthenticated ? (
            <>
              <div style={{ display: "flex", flexFlow: "row-reverse" }}>
                <HeaderRight></HeaderRight>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              </div>
              <Navbar.Collapse id="responsive-navbar-nav">
                <HeaderRoutes></HeaderRoutes>
              </Navbar.Collapse>
            </>
          ) : (
            <>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <HeaderRoutes></HeaderRoutes>
                <HeaderRight></HeaderRight>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
