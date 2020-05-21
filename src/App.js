import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Front from './Front/Front';
import Quizes from './Admin/Quizes/Main';
import Questions from './Admin/Questions/Main';
import Answers from './Admin/Answers/Main';
import Login from './Login/Login';

function App() {

  const AuthService = {
    checkAuth() {
      const token =  localStorage.getItem('token');
      const date = localStorage.getItem('expiration');
      if(token && date && (date.valueOf() > new Date().valueOf())){
        return true;
      }
      return false;
    }
    
  }
  
  const SecretRoute = ({ path, exact, component: Component, ...rest }) => (
    <Route path={path}
      exact={exact} render={(props) => (
      
      AuthService.checkAuth() === true
        ? <Component {...props} {...rest} />
        : <Redirect to='/login' />
    )} />
  );
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Front} />
        <Route exact path="/login" component={Login} />
        <SecretRoute exact path="/quizes" component={Quizes} />
        <SecretRoute exact path="/questions/:quizid" component={Questions} />
        <SecretRoute exact path="/answers/:quizid/:questionid" component={Answers} />
      </Switch>
    </Router>

  )
}

export default App;
