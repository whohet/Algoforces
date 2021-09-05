import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import './globalStyles.css';

import Header from './components/LayoutComponents/Header';
import Login from './components/Login/Login';
import LandingPage from './components/LandingPage/LandingPage';
import Page404 from './components/Page404';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={Login} />
            <Route path="*" component={Page404} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
