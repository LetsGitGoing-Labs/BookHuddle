import React from 'react';
import { Link } from 'react-router-dom';

import UpcomingMeetings from './upcoming.jsx';
import CreateMeeting from './create-meeting.jsx';
import ClubPageNavbar from '../navigation/club-nav.jsx';

import '../../styles/club.css';

class Club extends React.Component {
  constructor (props) {
    super(props);this.state = {
      joinMsg: '',
    };

    this.userJoinClub = this.userJoinClub.bind(this);
  }

  userJoinClub() {
    //We are accessing and slicing the page's url to obtain the club's ID
    var addUserID = this.props.user.id;
    var url = window.location.href;

    for (var i = url.length; i > 0; i--) {
      if (url[i] === '/') {
        var addClubID = url.slice(i + 1);
        break;
      }
    }

    var query = `mutation HandleJoinClub($addUserID: Int, $addClubID: Int) {
      handleJoinClub(userID: $addUserID, clubID: $addClubID)
    }`;

    $.ajax({
      type: 'POST',
      url: '/graphql',
      contentType: 'application/json',
      data: JSON.stringify({
        query: query,
        variables: { addUserID: addUserID, addClubID: addClubID }
      }),
      success: (data) => {
        console.log(data);
        this.setState({
          joinMsg: 'Club joined!'
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  render () {
    var clubData;
    if (this.props.searchResults.length) {
      clubData = this.props.searchResults.find((club) => club.id === Number(this.props.match.params.clubId));
    } else {
      clubData = this.props.clubs.find((club) => club.id === this.props.match.params.clubId);
    }
    return (
      <div id="club-page" className="col-md-9">
        <div className="container">
          <h2 className="club-title">{clubData.club_name}</h2>
            <ClubPageNavbar />
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-upcoming" role="tabpanel" aria-labelledby="nav-home-tab">
              <UpcomingMeetings meetings={clubData.meetings}/>
              </div>
              <div className="tab-pane fade" id="nav-members" role="tabpanel" aria-labelledby="nav-members-tab">
                Members
              </div>
              <div className="tab-pane fade" id="nav-history" role="tabpanel" aria-labelledby="nav-history-tab">
                Book History
              </div>
              <button className="btn" onClick={this.userJoinClub}>Join Club</button>
              {this.state.joinMsg.length > 1 && <div id="join-msg"><p>{this.state.joinMsg}</p></div>}
              <div className="tab-pane fade" id="nav-create-meeting" role="tabpanel" aria-labelledby="nav-create-meeting-tab">
                <CreateMeeting />
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Club;