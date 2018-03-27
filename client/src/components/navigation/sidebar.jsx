import React from 'react';

const Sidebar = () => {
  return (
    <div id="sidebar"class="col-md-3">
      <div className="sidebar-content">
        <p class="centered"><a href="profile.html"><img src="http://source.unsplash.com/aZm98bjnA20" className="img-circle"/></a></p>
        <h6 className="centered">Joe Smalls</h6>
        <ul className="centered">
          <li>
            <a href="#">Dashboard</a>
          </li>
          <li>
            <a href="#">Create a Club</a>
          </li>
          <li>
            <a href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar;