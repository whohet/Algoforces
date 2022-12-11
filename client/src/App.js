import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import "./globalStyles.css";

import { isLoggedInAPI } from "./api/userAuth";

import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Header from "./components/LayoutComponents/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";

import Problemset from "./components/Problemset/Problemset";
import Problem from "./components/Problem/Problem";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import FAQ from "./components/FAQ/FAQ";
import AboutUs from "./components/AboutUs/AboutUs";

import EditProblem from "./components/CreateProblem/EditProblem";
import MyProblems from "./components/CreateProblem/MyProblems";

import Page404 from "./components/Page404";

import UserContext from "./context/UserContext";
import Loading from "./components/utils/Loading/Loading";

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
        <UserContext.Provider
          value={{ isAuthenticated, setIsAuthenticated, userData, setUserData }}
        >
          <div className="app-container app-container-bg">
            <Header />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <Route exact path="/home" component={Problemset} />
              <Route exact path="/problemset" component={Problemset} />
              <Route
                exact
                path="/problem/:problemId/:activeTab?"
                component={Problem}
              />
              <Route exact path="/leaderboard" component={Leaderboard} />
              <Route exact path="/faq" component={FAQ} />
              {/* <Route exact path="/aboutus" component={AboutUs} /> */}
              <PrivateRoute exact path="/myProblems" component={MyProblems} />
              <PrivateRoute exact path="/edit/:id" component={EditProblem} />
              <Route path="*" component={Page404} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
