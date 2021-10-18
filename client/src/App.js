import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import "./globalStyles.css";

import { isLoggedInAPI } from "./api/userAuth";

import Header from "./components/LayoutComponents/Header/Header";
import PrivateRoute from "./components/PrivateRoute";
import Page404 from "./components/Page404";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import Home from "./components/Home/Home";
import Problemset from "./components/Problemset/Problemset";

import UserContext from "./context/UserContext";
import Loading from "./components/utils/Loading/Loading";
import CreateProblem from "./components/CreateProblem/CreateProblem";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const checkLoggedInStatus = async () => {
    try {
      const res = await isLoggedInAPI();
      if (res.success) {
        setIsAuthenticated(true);
        setUserData(res.user);
      }
    } catch (err) {}
    setLoading(false);
  };

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData, setUserData }}>
          <div className="app-container">
            <Header />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/problemset" component={Problemset} />
              <Route exact path="/create" component={CreateProblem} />
              <Route path="*" component={Page404} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
