import React from 'react';
import {BrowserRouter as Router, Switch,  Route} from 'react-router-dom';


import UtilityState from './context/utility/utilityState';
import  AuthState from './context/auth/authState';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import SignIn from './components/Signin';



import './App.css';
import './util.css';

function App() {
  return (
    <UtilityState>
     <AuthState>
            
        <Router>
          
          <Switch>
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            
            <Route path='/' component={LandingPage}  />
          </Switch>
        </Router>
       
        </AuthState>
    </UtilityState>
  );
}

export default App;
