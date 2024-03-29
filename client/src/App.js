import React, { useEffect, useState } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
import { Provider } from 'react-redux';
import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';



import validators from './common/validators';
import store from './store';
import {
  Account,
  SignUp as SignUpView,
} from './views';
import { Main as MainLayout } from './layouts';
import { RouteWithLayout } from './components';
import Login from 'views/Login/Login';
import Home from 'views/Home/Home'
import Details from 'views/details/Details';
import PostQuestion from 'views/PostQuestion/PostQuestion';
import Axios from 'axios';
import EditQuestion from 'views/EditQuestion/EditQuestion';
import Hot from 'views/Hot/Hot';
import Filter from 'views/Filter/Filter';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));


}


const App = () => {
  const [user, setUser] = useState({})

  useEffect(() => {

    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      // Set user and isAuthenticated
      setUser(decoded)
    }
  }, [])




  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUpView} />
          <Switch>
            <RouteWithLayout
              component={Home}
              exact
              layout={MainLayout}
              path="/"
            />
          </Switch> 
           <Switch>
            <RouteWithLayout
              component={Details}
              exact
              layout={MainLayout}
              path="/details"
            />
          </Switch>
           <Switch>
            <RouteWithLayout
              component={PostQuestion}
              exact
              layout={MainLayout}
              path="/ask"
            />
          </Switch>
           <Switch>
            <RouteWithLayout
              component={EditQuestion}
              exact
              layout={MainLayout}
              path="/edit"
            />
          </Switch>
           <Switch>
            <RouteWithLayout
              component={Hot}
              exact
              layout={MainLayout}
              path="/hot"
            />
          </Switch>
           <Switch>
            <RouteWithLayout
              component={Filter}
              exact
              layout={MainLayout}
              path="/filter"
            />
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}
export default App;