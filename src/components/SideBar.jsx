import background from "./background/pattern_h.png";

import React from "react";

function SideBar() {
  return (
    <>
      <nav id="sidebar" style={{ backgroundImage: `url(${background})` }}>
        <div className="sidebar_blog_1">
          <div className="sidebar-header">
            <div className="logo_section">
              <a href="index.html">
                <img
                  className="logo_icon img-responsive"
                  src="images/logo/logo.png"
                  alt="#"
                />
              </a>
            </div>
          </div>
          <div className="sidebar_user_info">
            <div className="icon_setting"></div>
            <div className="user_profle_side">
              <div className="user_img">
                <img
                  className="img-responsive"
                  src="images/logo/logo.png"
                  alt="#"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar_blog_2">
          <h4>Phonetics Dashboard</h4>
          <ul className="list-unstyled components">
            <li className="active">
              <a>
                <img
                  style={{ marginRight: "5px" }}
                  src="images/icons/to-do-list.png"
                />
                <span>Phonetics List</span>
              </a>
              <ul className="list-unstyled mb-3" id="dashboard">
                <li>
                  <a href="">
                    <span>Examples</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span>Quiz</span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="widgets.html">
                <img
                  style={{ marginTop: "-20px", marginRight: "5px" }}
                  src="images/icons/001-programmer.png"
                />
                <span>Users</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
export default SideBar;
