import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";

import UserContext from "../../context/UserContext";
import useToast from "../../customHooks/useToast/useToast";
import useLoader from "../../customHooks/useLoader/useLoader";

import { loginAPI, registerAPI } from "../../api/userAuth";

import "./Login.css";

function Login() {
  const [singInUsername, setSingInUsername] = useState("");
  const [singInPassword, setSingInPassword] = useState("");

  const [singUpEmail, setSingUpEmail] = useState("");
  const [singUpUsername, setSingUpUsername] = useState("");
  const [singUpPassword, setSingUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

  const [method, setMethod] = useState("signin");

  const userContext = useContext(UserContext);
  const { state, search } = useLocation();
  const history = useHistory();

  const [toast, ToastContainer] = useToast();
  const [loader, showLoader, hideLoader] = useLoader();

  const changeToSignUp = () => {
    setMethod("signup");
  };
  const changeToSignIn = () => {
    setMethod("signin");
  };

  const onSignInClick = async (e) => {
    e.preventDefault();
    showLoader();
    try {
      const userData = { username: singInUsername, password: singInPassword };
      const res = await loginAPI(userData);
      if (res && res.success) {
        userContext.setIsAuthenticated(true);
        userContext.setUserData(res.user);
        if (state && state.from) {
          return history.push(state.from);
        } else {
          return history.push("/home");
        }
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Internal server error. Please try again.");
      }
    }

    hideLoader();
  };
  const onSignUpClick = async (e) => {
    e.preventDefault();
    showLoader();
    try {
      const userData = {
        email: singUpEmail,
        username: singUpUsername,
        password: singUpPassword,
        confirmPassword: signUpConfirmPassword,
      };
      await registerAPI(userData);
      toast.success(
        "Account Registered successfully. Please check your mail to confirm email address. Also make sure to check spam folder."
      );
    } catch (err) {
      if (err && err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Internal server error. Please try again.");
      }
    }
    hideLoader();
  };

  useEffect(() => {
    // Search contains URL query parameters. like "?emailConfirm=true"
    // So we will show message to user that their email is confirmed.
    if (search.includes("?emailConfirm=true")) {
      toast.success("Your email address has been confirmed. Now you can login.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Currently "sign in" card is shown on login page.
    // If user is redirected to "sign up" page(maybe user click on header sign up button) then we need to switch to signup card.
    // We will send some state in "Link" component to let Login page know about which card to show.
    if (state && state.method) {
      if (state.method === "signup") {
        changeToSignUp();
      } else if (state.method === "signin") {
        // Why are we doing this?? we only need to do this for signup card. right?
        // Nope. Suppose user is on signup card and user presses login button on header. then also we need to show animation
        changeToSignIn();
      }
    }
  }, [state]);

  return (
    <>
      <div id="login-container">
        <div className={`login-card ${method === "signup" ? "right-panel-active" : ""} `} id="login-card">
          <div className="form-container sign-up-container">
            <form onSubmit={onSignUpClick}>
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="Name"
                value={singUpUsername}
                onChange={(e) => setSingUpUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={singUpEmail}
                onChange={(e) => setSingUpEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={singUpPassword}
                onChange={(e) => setSingUpPassword(e.target.value)}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={signUpConfirmPassword}
                onChange={(e) => setSignUpConfirmPassword(e.target.value)}
              />
              <button>Sign Up</button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form onSubmit={onSignInClick}>
              <h1>Sign in</h1>
              <input
                type="text"
                placeholder="Email or Username"
                value={singInUsername}
                onChange={(e) => setSingInUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={singInPassword}
                onChange={(e) => setSingInPassword(e.target.value)}
              />
              <Link to="/forgotpassword">Forgot your password?</Link>
              <button>Sign In</button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your sign-in details</p>
                <button onClick={changeToSignIn} className="ghost" id="signIn">
                  Sign In
                </button>
              </div>

              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your details and start journey with us</p>
                <button onClick={changeToSignUp} className="ghost" id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {ToastContainer}
      {loader}
    </>
  );
}
export default Login;
