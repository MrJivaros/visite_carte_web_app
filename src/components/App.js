import React,{useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import LoginScreen from '../screens/Login'
import RegisterScreen from '../screens/Register'
import BibliothequeScreen from '../screens/Bibliotheque'
export default function BasicExample() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <LoginScreen />
          </Route>
          <Route path="/register">
            <RegisterScreen />
          </Route>
          <Route path="/bibliotheque">
            <BibliothequeScreen/>
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}


