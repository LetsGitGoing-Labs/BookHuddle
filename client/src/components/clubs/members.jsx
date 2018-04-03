import React from 'react';

const memberList = [
  {name: "Katerina Haus", profile_url: "gdKNGWKoxsU"},
  {name: "Timothy Bartley", profile_url: "6anudmpILw4"},
  {name: "Betty Anderson", profile_url: "2z87shqF8Fo"},
  {name: "Anita Aurelia", profile_url: "mEZ3PoFGs_k"}
];

class Members extends React.Component {

  render() {
    return (
      <div className="row">
        { memberList.map(member =>
          (
            <div key={member.profile_url} className="col-md-6 content-panel">
              <img src={`https://source.unsplash.com/${member.profile_url}`} className="img-circle" />
              <h5 className="user">{member.name}</h5>
            </div>
          )
        )}
      </div>
    )
  }
}

export default Members;

