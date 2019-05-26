import React from 'react';
import {NavLink, Link} from 'react-router-dom';


const NavBar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-lig">
           <Link className="navbar-brand" to="/">MoviesApp</Link>
           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
               aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
           </button>

           <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav mr-auto">
                   
                       <NavLink className = "nav-item nav-link" to = "/movies"> Movies </NavLink>
            
                   
                       <NavLink className = "nav-item nav-link" to = "/customers"> Customers </NavLink>
                       <NavLink className = "nav-item nav-link" to = "/rentals"> Rentals </NavLink>
                       <NavLink className = "nav-item nav-link" to = "/login"> Login </NavLink>
                       <NavLink className = "nav-item nav-link" to = "/register">Register</NavLink>
                </ul>
            </div>



        </nav>
      );
}
 
export default NavBar;