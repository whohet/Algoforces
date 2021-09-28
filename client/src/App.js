import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import "./globalStyles.css";

import { isLoggedInAPI } from "./api/userAuth";

import Header from "./components/LayoutComponents/Header";
import Login from "./components/Login/Login";
import LandingPage from "./components/LandingPage/LandingPage";
import Page404 from "./components/Page404";
import Home from "./components/Home/Home";
import UserContext from "./components/context/UserContext";
import PrivateRoute from "./components/PrivateRoute";
import Problemset from "./components/Problemset/Problemset";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const checkLoggedInStatus = async () => {
    try {
      const res = await isLoggedInAPI();
      if (res.success) {
        setIsAuthenticated(true);
        setUserData({ username: "temp_name" });
      }
    } catch (err) {}
    setLoading(false);
  };

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/problemset" component={Problemset} />
              <Route path="*" component={Page404} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
