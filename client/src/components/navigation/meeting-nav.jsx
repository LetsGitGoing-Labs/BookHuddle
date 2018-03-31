import React from 'react';

const MeetingPageNavbar = () => (
  <nav className="centered">
    <div className="nav" id="meeting-page-nav" role="tablist">
      <a className="nav-link active" id="nav-details-tab" data-toggle="tab" href="#nav-details" role="tab" aria-controls="nav-details" aria-selected="true">Details</a>
      <a className="nav-link" id="nav-meet-members-tab" data-toggle="tab" href="#nav-meet-members" role="tab" aria-controls="nav-meet-members" aria-selected="false">Members</a>
      <a className="nav-link" id="nav-trivia-tab" data-toggle="tab" href="#nav-trivia" role="tab" aria-controls="nav-trivia" aria-selected="false">Trivia</a>
      <a className="nav-link" id="nav-dq-tab" data-toggle="tab" href="#nav-dq" role="tab" aria-controls="nav-dq" aria-selected="false">Discussion Questions</a>
    </div>
  </nav>
);

export default MeetingPageNavbar;