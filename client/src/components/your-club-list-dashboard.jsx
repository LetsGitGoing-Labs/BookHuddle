import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

class YourClubListDashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return !this.props.yourClubList || this.props.yourClubList.length === 0 ?
      (
        <div className="ui segment">
          <h2 className="dashboard-header">Your Book Clubs:</h2>
          <div>You're not in any book clubs!</div>
        </div>
      ) : (
        <div className="ui segment">
          <h2 className="dashboard-header">Your Book Clubs:</h2>
          <div className="ui seven link cards">
            {this.props.yourClubList.map((yourClub, i) =>
            <Link to='/club' onClick={this.props.renderClub}>
              <div className="card" id={i} style={{padding: '1em'}} >
                <img className="carousel-card-img" src={yourClub.image}/>
                <div className="content">
                  <div className="header">{yourClub.title}</div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    )
  }
}
export default YourClubListDashboard;