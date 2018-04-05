import React from 'react';
import MainNavbar from '../navigation/MainNavbar';

class About extends React.Component {
  render() {
    return (
      <div>
      <MainNavbar />

     <div className="container mt">
     <h3 className="mb">OUR TEAM</h3>
      <div className="row centered">

        <div className="col-md-3">
          <img className="img-rnd" src="https://avatars3.githubusercontent.com/u/26492780?s=460&v=4" alt="" />
          <h4 className="ctitle">John Blaine</h4>
          <h6 className ="grey">Senior Engineer</h6>
        </div>

        <div className="col-md-3">
          <img className="img-rnd" src="https://avatars0.githubusercontent.com/u/34036100?s=460&v=4" alt="" />
          <h4 className="ctitle">Mike Butak</h4>
          <h6 className ="grey">Senior Engineer</h6>
        </div>

        <div className="col-md-3">
          <img className="img-rnd" src="https://avatars0.githubusercontent.com/u/24405162?s=400&v=4" alt="" />
          <h4 className="ctitle">Sam Donner</h4>
          <h6 className ="grey">Product Owner</h6>
        </div>


       <div className="col-md-3">
          <img className="img-rnd" src="https://avatars0.githubusercontent.com/u/28540710?s=460&v=4" alt=""/>
          <h4 className="ctitle">Queenie Smith</h4>
          <h6 className ="grey">Scrum Master</h6>
        </div>
      </div>

     </div>
     </div>
    );
  }
}

export default About;
