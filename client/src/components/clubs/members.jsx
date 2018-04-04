import React from 'react';

class Members extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    memberList: [
      {name: "Katerina Haus", profile_url: "gdKNGWKoxsU"},
      {name: "Timothy Bartley", profile_url: "6anudmpILw4"},
      {name: "Betty Anderson", profile_url: "2z87shqF8Fo"},
      {name: "Anita Aurelia", profile_url: "mEZ3PoFGs_k"}
    ]
  }
  this.getClubMembers = this.getClubMembers.bind(this);
}

componentDidMount() {
  let clubId = this.props.club;
  this.getClubMembers(clubId)
}

getClubMembers(clubId) {
    const query = `mutation getClubMembers($clubId: String) {
      getClubMembers(clubId: $clubId)
    }`;
    $.ajax({
      type: 'POST',
      url: '/graphql',
      contentType: 'application/json',
      data: JSON.stringify({
        query,
        variables: {
          clubId,
        },
      }),
      success: (data) => {
        console.log('success');
        let members = JSON.parse(data.data.getClubMembers);
        this.setState({
          memberList: members
        });
      },
      error: (data) => {
        console.log(data);
      },
    });
  }

  render() {
    return (
      <div className="row">
        { this.state.memberList.map(member =>
          (
            <div key={member.profile_url} className="col-md-6 content-panel">
              <img src={member.profile_url} className="img-circle" />
              <div className="user">
                <h5>{member.first_name} {member.last_name}</h5>
                <a href={`mailto:${member.email}`}>Contact <i className="far fa-envelope"></i></a>
              </div>
            </div>
          )
        )}
      </div>
    )
  }
}

export default Members;

