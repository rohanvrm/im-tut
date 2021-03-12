import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import{Route, BrowserRouter as Router} from 'react-router-dom';

import loginComponent from './login/login';
import signupComponent from './signup/signup';
import dashboardComponent from './dashboard/dashboard';

import { firebase } from '@firebase/app';



//const firebase = require('firebase');
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyDbJ2oOfNrYhOzZ2-fQoGJRTBVeUSsOoFc",
    authDomain: "im-tut-5492f.firebaseapp.com",
    projectId: "im-tut-5492f",
    storageBucket: "im-tut-5492f.appspot.com",
    messagingSenderId: "459439575133",
    appId: "1:459439575133:web:ecfd235fdc77a470843db4",
    measurementId: "G-MNBWZBL51P"
});

const routing=( <Router>
  
     <div id='routing-container'>
        <Route path='/login' component={loginComponent}></Route>
        <Route path='/signup' component={signupComponent}></Route>
        <Route path='/dashboard' component={dashboardComponent}></Route>
    </div>
    
  </Router>)

ReactDOM.render(routing, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

