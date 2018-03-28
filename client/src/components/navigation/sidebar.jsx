import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  return (
    <div id="sidebar"className="col-md-3">
      <div className="sidebar-content">
        <p className="centered"><a href="profile.html"><img src={props.user.profile_url} className="img-circle"/></a></p>
        <h5 className="centered">{props.user.first_name} {props.user.last_name}</h5>
        <h6 className="centered" style={{color: 'rgb(174, 178, 183)'
        }}><em>{props.user.location}</em></h6>
        <ul className="mt">
          <li>
            <Link to="/dashboard">
              <i className="fas fa-desktop"></i><span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/create-club">
              <i className="fas fa-plus-circle"></i><span>New Club</span>
            </Link>
          </li>
          <li>
            <Link to="/logout"><i className="fas fa-sign-out-alt">
              </i><span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar;