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
  let clubId = this.props.club.id;
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
        console.log(Array.isArray(members), '<-- is Array members');
        console.log('data from server:', members);
        console.log('this.state b4', this.state);
        this.setState({
          memberList: members
        });
        console.log('this.state after', this.state);
        console.log(Array.isArray(members), '<-- is Array members');
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
              <h5 className="user">{member.first_name} {member.last_name}</h5>
            </div>
          )
        )}
      </div>
    )
  }
}

export default Members;

