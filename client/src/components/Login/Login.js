import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './Login.css';
function Login() {
  const [singInEmail, setSingInEmail] = useState('');
  const [singInPassword, setSingInPassword] = useState('');

  const [singUpEmail, setSingUpEmail] = useState('');
  const [singUpUsername, setSingUpUsername] = useState('');
  const [singUpPassword, setSingUpPassword] = useState('');

  const [method, setMethod] = useState('signin');
  const { state } = useLocation();

  const changeToSignUp = () => {
    setMethod('signup');
  };
  const changeToSignIn = () => {
    setMethod('signin');
  };

  const onSignInClick = (e) => {
    e.preventDefault();
    alert('Sign In');
  };
  const onSignUpClick = (e) => {
    e.preventDefault();
    alert('Sign Up');
  };

  useEffect(() => {
    // Currently "sign in" card is shown on login page.
    // If user is redirected to "sign up" page(maybe user click on header sign up button) then we need to switch to signup card.
    // We will send some state in "Link" component to let Login page know about which card to show.
    if (state && state.method) {
      if (state.method === 'signup') {
        changeToSignUp();
      } else if (state.method === 'signin') {
        // Why are we doing this?? we only need to do this for signup card. right?
        // Nope. Suppose user is on signup card and user presses login button on header. then also we need to show animation
        changeToSignIn();
      }
    }
  }, [state]);

  return (
    <div id="login-container">
      <div className={`login-card ${method === 'signup' ? 'right-panel-active' : ''} `} id="login-card">
        <div className="form-container sign-up-container">
          <form onSubmit={onSignUpClick}>
            <h1>Create Account</h1>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={onSignInClick}>
            <h1>Sign in</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="/forgotpassword">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button onClick={changeToSignIn} className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button onClick={changeToSignUp} className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
