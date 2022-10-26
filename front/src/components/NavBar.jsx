import React from "react";
import { ReactSession }  from 'react-client-session';
import { Link } from "react-router-dom";

function NavBar() {
  const user = localStorage.getItem("username");

  return (
    <div className="topbar">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="full">
          <button type="button" id="sidebarCollapse" className="sidebar_toggle">
            <i className="fa fa-bars"></i>
          </button>
          <div className="logo_section">
            <a href="index.html">
              <img
                className="img-responsive"
                src="http://localhost:3000/images/logo/logo.png"
                alt="#"
              />
            </a>
          </div>
          <div className="right_topbar">
            <div className="icon_info">
              <ul className="user_profile_dd">
              {user? 
                    (
                      <li>
                      <a className="dropdown-toggle" data-toggle="dropdown" >

                        <img
                          className="img-responsive rounded-circle"
                          src="images/layout/user-profile.png"
                          alt="#"
                        />
                         <span className="name_user">{user}</span>
                      </a>
                      <div className="dropdown-menu">
                        <Link to ={'/logout'} className="dropdown-item" href="#">
                          <span>Log Out</span> <i className="fa fa-sign-out"></i>
                        </Link>
                      </div>
                    </li>
                    ) :
                    <li>
                    <Link to ={'/'}>
                      <img
                        className="img-responsive rounded-circle"
                        src="images/layout/loginIcon.png"
                        alt="#"
                      />
                       <span className="name_user">Login</span>
                    </Link>
                  </li>
                     
                     }
              
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default NavBar;
