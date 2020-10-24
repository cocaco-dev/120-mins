import React, {Fragment, useContext} from 'react';
import {Link}  from 'react-router-dom';



import authContext from '../../context/auth/authContext'

import './navbar.css';
const Navbar = () => {
  const AuthContext = useContext(authContext);
    const {authenticated, logout, user} = AuthContext;
    
      return ( 
        
          <Fragment>
            
      
                <nav className="main-nav ">
                  <div className="logo btn-effect-press">
                      <Link to="/">Logo</Link>
                  </div>
                  <div className="nav-items">
                    {authenticated?
                    ( <>
                    
                      <div className="nav-links bold"><button onClick={logout} className="btn-primary">Log Out</button></div>
                    <div className="nav-links bold"><p ></p></div>
                      </>
                    )
                    :
                    (
                      <>
                      <div className="nav-links bold"><Link className="nav-buttons" to="/signin">Sign In</Link></div>
                      <div className="nav-links bold"><Link className="nav-buttons" to="/signup">Sign Up</Link></div>
                      </>
                    )
                    }
                      
                  </div>
                </nav>
              
              
  
            
            
          </Fragment>
    );
}
 
export default Navbar;