import React from 'react';
import './App.css';
import Movies from './Movies.js';
import {Route,Redirect,Switch} from 'react-router-dom';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NotFound from './components/NotFound';
import NavBar from './components/navbar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import Register from './components/register';

function App() {
  return (
    <React.Fragment>
      <NavBar/>
   
    <main className = "container">
     
      <Switch>
        <Route path="/login" component = {LoginForm} />
        <Route path="/customers" component = {Customers} />
        <Route path = "/rentals" component = {Rentals} />
        <Route path = "/movies/:id" component = {MovieForm}/>
        <Route path = "/movies" component = {Movies} />
        <Route path = "/register" component = {Register} />
        <Route path = "/not-found" component = {NotFound} />
        <Route path = "/"  exact component = {Movies} />
       
        <Redirect to = "/not-found"/>
      </Switch>
     
    
      
    </main>

    </React.Fragment>
  );
}

export default App;
