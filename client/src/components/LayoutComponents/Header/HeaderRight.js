import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import UserContext from "../../../context/UserContext";
import ProfilePicture from "../../utils/ProfilePicture/ProfilePicture";
import { logoutAPI } from "../../../api/userAuth";

function HeaderRight() {
  const userContext = useContext(UserContext);
  const history = useHistory();

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (err) {}
    userContext.setUserData({});
    userContext.setIsAuthenticated(false);
    return history.push("/");
  };

  if (userContext.isAuthenticated) {
    // If user has logged in then show profile picture instead of auth buttons.
    return (
      <div>
        <NavDropdown
          title={
            <div className="header-profile-dropdown">
              <ProfilePicture width={40} rounded={true} />
            </div>
          }
          align="end"
          size="lg"
          className="basic-nav-dropdown"
        >
          <NavDropdown.Item href={`/profile/${userContext.userData.username}`}>Profile</NavDropdown.Item>
          <NavDropdown.Item href={`/submissions/${userContext.userData.username}`}>Submissions</NavDropdown.Item>
          <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </div>
    );
  }
  return (
    <Nav>
      <Link to={{ pathname: "/login", state: { method: "signin" } }}>
        <button className="header-button header-login-button">Login</button>
      </Link>
      <Link to={{ pathname: "/login", state: { method: "signup" } }}>
        <button className="header-button header-register-button">Sign up</button>
      </Link>
    </Nav>
  );
}

export default HeaderRight;
