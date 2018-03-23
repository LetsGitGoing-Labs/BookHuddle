import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

class ClubList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return !this.props.clubs || this.props.clubs.length === 0 ?
      (
        <div className="ui segment">
          <h2 className="dashboard-header">Your Book Clubs:</h2>
          <div>You're not in any book clubs!</div>
        </div>
      ) : (
        <div className="ui segment">
          <h2 className="dashboard-header">Your Book Clubs:</h2>
          <div className="ui seven link cards">
          {this.props.clubs.map((club, i) =>
            <div className="card" key={i} style={{padding: '1em'}} >
              <img className="carousel-card-img" src={club.image}/>
              <div className="content">
                <div className="header">{club.title}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default ClubList;